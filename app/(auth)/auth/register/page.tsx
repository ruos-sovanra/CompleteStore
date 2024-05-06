'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './style.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormDataRegister } from '@/libs/difinition';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {IoEyeOffSharp, IoEyeSharp} from "react-icons/io5";
import {signIn} from "next-auth/react";
import Link from "next/link";

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
                router.push('/activate-confirm-email');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <main className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
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
                    <Form className="space-y-6" action="#" method="POST">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Register your account
                            </h2>
                        </div>
                        <div className=" sm:mx-auto sm:w-full sm:max-w-[480px]">
                            <div className="bg-white  px-6 py-12 shadow sm:rounded-lg sm:px-12">

                                <div className="mb-5">
                                <label className="block text-sm font-medium leading-6 text-gray-900"
                                       htmlFor="first-name">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    placeholder="First Name"
                                    name="first_name"
                                    id="first-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage name="first_name" component="div" className={`${style.error}`}/>
                            </div>
                            {/* Last Name */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium leading-6 text-gray-900"
                                       htmlFor="last-name">
                                    Last Name
                                </label>
                                <Field
                                    type="text"
                                    placeholder="Last Name"
                                    name="last_name"
                                    id="last-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage name="last_name" component="div" className={`${style.error}`}/>
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage name="email" component="div" className={`${style.error}`}/>
                            </div>
                            {/* Password */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    placeholder="Password"
                                    name="password1"
                                    id="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage name="password1" component="div" className={`${style.error}`}/>
                            </div>
                            {/* Confirm Password */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium leading-6 text-gray-900"
                                       htmlFor="password2">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    id="password2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage name="password2" component="div" className={`${style.error}`}/>
                            </div>

                            <div className="flex mt-5 items-center justify-between">
                                <div className="flex items-center">
                                    <Field
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <Link href={"/auth/register"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Register Account
                                    </Link>
                                </div>
                            </div>

                            <div className='mt-10'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>

                            <div>
                                <div className="relative mt-10">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200"/>
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">Or register with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#f8f8f8be] px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                                        onClick={() => {
                                            signIn("google")

                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             viewBox="0 0 256 262">
                                            <path fill="#4285F4"
                                                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/>
                                            <path fill="#34A853"

                                                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/>
                                            <path fill="#FBBC05"
                                                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/>
                                            <path fill="#EB4335"
                                                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/>
                                        </svg>

                                        <span className="text-sm font-semibold leading-6">Google</span>
                                    </a>

                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#f8f8f8be] px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                                        onClick={async () => {
                                            await signIn("github")
                                        }}
                                    >
                                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">GitHub</span>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
};

export default RegisterPage;
