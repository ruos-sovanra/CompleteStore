'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import style from "./style.module.css";
import {useUploadImageMutation} from "@/redux/service/product";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/navigation";
import Image from "next/image";

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

type Input={
    name:string,
    fileProduct:null,
}

const initfile:Input ={
    name:"",
    fileProduct:null,
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    fileProduct: Yup.mixed()
        .test("fileFormat", "Unsupported Format", (value: any) => {
            if (!value) {
                return true;
            }
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File Size is too large", (value: any) => {
            if (!value) {
                true;
            }
            return value.size <= FILE_SIZE;
        })

        .required("Required"),
});

export default function UploadPage() {

    const[uploadImage,{data,error}]=useUploadImageMutation();
    const router = useRouter();

    const handleUploadImage = async (file:any, name:any) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", file);
        console.log(formData);

        try {
            const response = await uploadImage({ data: formData }); // Correct way to call the mutation function
            console.log(response); // Handle the response as needed
        } catch (error) {
            console.error(error); // Handle errors
        }
        toast.success("Image uploaded successfully")

    };


    return (
        <main className='h-screen grid place-content-center'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Formik
                validationSchema={validationSchema}
                initialValues={initfile}
                onSubmit={async (values:any) => {
                    const name= values.name;
                    const image = values.fileProduct;
                    handleUploadImage(image, name);

                }}
            >

                {({ setFieldValue }) => (
                    <Form   >
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="name">
                                Product image Name
                            </label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className={`${style.input}`}
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className={`${style.error}`}
                            />
                        </div>
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="fileProduct">
                                Product image
                            </label>
                            <Field
                                type="file"
                                name="fileProduct"
                                id="fileProduct"
                                component={CustomInput}
                                setFieldValue={setFieldValue}
                                className={`${style.input}`}
                            />
                            <ErrorMessage
                                name="fileProduct"
                                component="div"
                                className={`${style.error}`}
                            />
                        </div>

                        {/* handle submit  */}
                        <button type="submit" className={`${style.button}`}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </main>
    )
}
const CustomInput = ({ field, form, setFieldValue }: any) => {
    const [imagePreview, setImagePreview] = useState("");

    const handleUploadeFile = (e: any) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        console.log(localUrl);
        setImagePreview(localUrl);

        setFieldValue(field.name, file);

    };
    return (
        <div>
            <input onChange={(e) => handleUploadeFile(e)} type="file" />
            {imagePreview && <Image width={200} height={200} priority src={imagePreview} alt="preview" />}
        </div>
    );
};
