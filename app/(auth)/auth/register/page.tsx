'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './style.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormDataRegister } from '@/libs/difinition';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ValueTypes = {
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name: string;
};

const initialValues: ValueTypes = {
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
};

const strongPasswordRegex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*]).{8,}$');

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password1: Yup.string()
        .min(8, 'Password is too short, At least 8 characters')
        .matches(
            strongPasswordRegex,
            'Password must contain at least one upper case English letter, one lower case English letter, one digit and one special character'
        )
        .required('Required'),
    password2: Yup.string().oneOf([Yup.ref('password1')], 'Passwords must match').required('Required'),
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
});

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST || '';

const RegisterPage = () => {
    const [formData, setFormData] = useState<FormDataRegister>({
        email: '',
        password1: '',
        password2: '',
        first_name: '',
        last_name: '',
    });

    const router = useRouter();

    const handleRegister = async (values: ValueTypes) => {
        try {
            const res = await fetch(`${BaseUrl}register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), // Send form values directly
            });
            if (res.ok) {
                toast.info('Registration success')
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <main className={style.container}>
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
                theme="light"
            />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
                {({ errors, touched }) => (
                    <Form className="bg-gray-100 p-4 rounded-lg w-96">
                        <h1 className={`${style.title}`}>Register</h1>
                        {/* First Name */}
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="first-name">
                                First Name
                            </label>
                            <Field
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                id="first-name"
                                className={`${style.input}`}
                            />
                            <ErrorMessage name="first_name" component="div" className={`${style.error}`} />
                        </div>
                        {/* Last Name */}
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="last-name">
                                Last Name
                            </label>
                            <Field
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                id="last-name"
                                className={`${style.input}`}
                            />
                            <ErrorMessage name="last_name" component="div" className={`${style.error}`} />
                        </div>
                        {/* Email */}
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="email">
                                Email
                            </label>
                            <Field
                                type="text"
                                placeholder="Email"
                                name="email"
                                id="email"
                                className={`${style.input}`}
                            />
                            <ErrorMessage name="email" component="div" className={`${style.error}`} />
                        </div>
                        {/* Password */}
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="password">
                                Password
                            </label>
                            <Field
                                type="password"
                                placeholder="Password"
                                name="password1"
                                id="password"
                                className={`${style.input}`}
                            />
                            <ErrorMessage name="password1" component="div" className={`${style.error}`} />
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="password2">
                                Confirm Password
                            </label>
                            <Field
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                id="password2"
                                className={`${style.input}`}
                            />
                            <ErrorMessage name="password2" component="div" className={`${style.error}`} />
                        </div>
                        {/* Login Button */}
                        <button type="submit" className={`${style.button}`}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </main>
    );
};

export default RegisterPage;
