'use client'
import {Fragment, useRef, useState} from "react";
import {useDeleteProductMutation, useGetMyProductsQuery} from "@/redux/service/product";
import { ProductType } from "@/libs/difinition";
import { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import {Dialog, Menu, Transition} from '@headlessui/react';
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import classNames from "classnames";
import {Dropdown} from "flowbite-react";



type PropType = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    seller: string;

}

const ShopPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const { data, error, isLoading } = useGetMyProductsQuery({ page: 1, pageSize: 10 });
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    const filteredProducts = data ? data.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
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
            <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
                        onClose={setOpenModal}>
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 p-5">
                                    Delete Confirmation
                                </Dialog.Title>
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600"
                                                                     aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Description as="p" className="text-sm text-gray-500">
                                                Are you sure you want to delete this product?
                                            </Dialog.Description>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={confirmDelete}>
                                        Delete
                                    </button>
                                    <button type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={cancelDelete} ref={cancelButtonRef}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>


            <div className="px-4 sm:px-6 lg:px-8">
                <Dropdown label="Create" inline>
                    <Dropdown.Item>
                        <Link href={"/create"}>
                            <h1>Create Product</h1>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href={"/upload_image_category"}>
                            <h1>Create Category Image</h1>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href={"/upload_image_product"}>
                            <h1> Create Product Image</h1>
                        </Link>
                    </Dropdown.Item>
                </Dropdown>
                <div className="-mx-4 mt-8 sm:-mx-0">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Product Name
                            </th>
                            <th scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                Price
                            </th>
                            <th scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                Category
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Image
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {
                            searchTerm === ''
                                ? data?.map((product: any) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.name}
                                        </td>
                                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                            {product.price}
                                        </td>
                                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                            {product.category}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <img src={product.image} alt={product.name} className="w-16 h-16"/>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button
                                                        className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                                        <span className="sr-only">Open options</span>
                                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => handleView(product)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        View
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => handleUpdate(product)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Update
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => handleDelete(product)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                                : filteredProducts.map((product: any) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.name}
                                        </td>
                                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                            {product.price}
                                        </td>
                                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                            {product.category}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <img src={product.image} alt={product.name} className="w-16 h-16"/>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button
                                                        className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                                        <span className="sr-only">Open options</span>
                                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => handleView(product)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        View
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => handleUpdate(product)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Update
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => handleDelete(product)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default ShopPage;