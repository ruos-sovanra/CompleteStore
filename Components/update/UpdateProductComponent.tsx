'use client'
import {useCreateProductMutation, useUpdateProductMutation} from "@/redux/service/product";
import {useState} from "react";
import ProductDropdownComponent from "@/Components/dropdown/ProductDropdownComponent";
import CategoryDropdownComponent from "@/Components/dropdown/CategoryDropdownComponent";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {ProductType} from "@/libs/difinition";
import {id} from "postcss-selector-parser";
import {useRouter} from "next/navigation";

type ImageType = {
    id: number;
    name: string;
    image: string;
}
type CategoryType = {
    name: string;
}
type UpdateProductType = {
    id: number;
    category: CategoryType;
    name: string;
    price: number;
    quantity: number;
    desc: string;
    image ?: string;
}
type UpdateProductProps = {
    product: ProductType;

}



const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    desc: Yup.string().required("Description is required"),
    category: Yup.object().shape({
        name: Yup.string().required("Category name is required"),
    }),
});

const UpdateProductComponent = ({product }:UpdateProductProps) => {
    const[updateProduct, {data, isLoading, error}] = useUpdateProductMutation();
    console.log("product Update",data)
    const [productImage, setProductImage] = useState<ImageType | null>(null);
    const router = useRouter(); // Add this line to get access to the router
    if (!product) {
        return null; // Or render some error message
    }

    if (!product) {
        return null; // Or render some error message
    }

    const initialValues: UpdateProductType = {
        id: product?.id,

        category: {
            // @ts-ignore
            name: product?.category,
        },
        name: product?.name,
        price: Number(product?.price),
        image: product?.image ,
        quantity: Number(product?.quantity),
        desc: product?.desc,
    };
    const handleUpdateProduct = async (values: UpdateProductType) => {
        console.log('handleUpdateProduct called'); // Log when the function is called
        console.log('Form values:', values); // Log the form values

        try {
            // Use the form values to create a new product
            await updateProduct({
                id: values.id,
                updatedProduct: {
                    category: {
                        name: values.category.name,
                    },
                    name: values.name,
                    price: values.price,
                    quantity: values.quantity,
                    desc: values.desc,
                    image: productImage?.image,
                },
            });
            // After a successful update, redirect to the shop page
            router.push('/shop');
        } catch (error) {
            console.error('Failed to update product', error); // Log the error
        }
    }


    return (
        <section className="mt-[80px] flex items-center justify-center ">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="mb-5 text-2xl font-bold text-center">Create Page</h1>
                <Formik onSubmit={handleUpdateProduct} initialValues={initialValues}
                        validationSchema={validationSchema}>
                    {({errors, touched}) => {
                        console.log('Form errors:', errors); // Log the form errors
                        console.log('Touched fields:', touched); // Log the touched fields

                        return (
                            <Form method="POST" className="space-y-6">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                                        <Field
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            type="text" name="name" id="name"/>
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic"/>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                        <Field
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            type="number" name="price" id="price"/>
                                        <ErrorMessage name="price" component="div" className="text-red-500 text-xs italic"/>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <Field
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            type="number" name="quantity" id="quantity"/>
                                        <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs italic"/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                                        <Field
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            type="text" name="desc" id="desc"/>
                                        <ErrorMessage name="desc" component="div" className="text-red-500 text-xs italic"/>
                                    </div>
                                    <ProductDropdownComponent selectedImage={productImage}
                                                              setSelectedImage={setProductImage}/>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="category.name" className="block text-sm font-medium text-gray-700">Category Name</label>
                                        <Field
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            type="text" name="category.name" id="category.name"/>
                                        <ErrorMessage name="category.name" component="div" className="text-red-500 text-xs italic"/>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150"
                                    type="submit">Create Product
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </section>

    );
}

export default UpdateProductComponent;