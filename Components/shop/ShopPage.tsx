'use client'
import {Fragment, useRef, useState} from "react";
import {useDeleteProductMutation, useGetMyProductsQuery} from "@/redux/service/product";
import { ProductType } from "@/libs/difinition";
import DataTable, { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";



type PropType = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    seller: string;

}

const ShopPage = () => {
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const { data, error, isLoading } = useGetMyProductsQuery({ page: 1, pageSize: 10 });
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    const columns: TableColumn<ProductType>[] = [
        {
            name: 'Product Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: 'Category',
            selector: (row) => row.category,
            sortable: true,
        },
        {
            name: 'Image',
            selector: (row): any => <img src={row.image} alt={row.name} className="w-16 h-16" />,
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row): any => (
                <div>
                    <button className="text-blue-500 pe-2" onClick={() => handleView(row)}>view</button>
                    <button className="text-yellow-400 pe-2" onClick={() => handleUpdate(row)}>Update</button>
                    <button className="text-red-500" onClick={() => handleDelete(row)}>Delete</button>
                </div>
            ),
        },
    ]
    const handleUpdate =  (product: ProductType) => {
        setSelectedProduct(product);
        router.push(`/update/${product.id}`);
    };
    const handleDelete = (product: ProductType) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };
    const handleView = (product: ProductType) => {
        setSelectedProduct(product);
        router.push(`/product/${product.id}`);
    }

    const confirmDelete = async () => {
        if (selectedProduct) {
            try {
                await deleteProduct({ id: selectedProduct.id });
                setOpenModal(false);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const cancelDelete = () => {
        setOpenModal(false);
    };
    const cancelButtonRef = useRef(null);
    if (isLoading) return <div>Loading...</div>;

    return (
        <main>
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpenModal}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 p-5">
                                    Delete Confirmation
                                </Dialog.Title>
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Description as="p" className="text-sm text-gray-500">
                                                Are you sure you want to delete this product?
                                            </Dialog.Description>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={confirmDelete}>
                                        Delete
                                    </button>
                                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={cancelDelete} ref={cancelButtonRef}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <DataTable
                className="overflow-x-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible 2xl:overflow-visible"
                fixedHeader={true}
                columns={columns}
                data={data}
                pagination
                responsive={true}
                striped
                highlightOnHover
            />
        </main>
    )
}

export default ShopPage;