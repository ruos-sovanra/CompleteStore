'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react";
import * as Yup from 'yup';
import style from './style.module.css';
import {fetchUserProfile} from "@/redux/feature/userProfile/userProfileSlice";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {selectToken, setAccessToken} from "@/redux/feature/auth/authSlice";
import {values} from "lodash";

type FormValues = {
    email: string;
    password: string;
};

const initialValues: FormValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST || '';

const LoginPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    console.log("Token from Redux store", token);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);



    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await fetch(`${BaseUrl}login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }).then((res) => res.json())
                .then((data) => {
                    console.log("Data in jwt test: ", data);

                    dispatch(setAccessToken(data.accessToken));
                    router.push('/');
                })
                .catch((error) => {
                    console.log(error);
                });


        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
            <main className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Start a 14 day free trial
                                </a>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <Formik initialValues={initialValues} onSubmit={handleSubmit}
                                        validationSchema={validationSchema}>
                                    {({errors}) => (
                                        <Form action="#" method="POST" className="space-y-6">
                                            <div>
                                                <label htmlFor="email"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <ErrorMessage name="email" component="div" className={`${style.error}`} />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="password"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Password
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    <ErrorMessage name="password" component="div" className={`${style.error}`} />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Field
                                                        id="remember-me"
                                                        name="remember-me"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="remember-me"
                                                           className="ml-3 block text-sm leading-6 text-gray-700">
                                                        Remember me
                                                    </label>
                                                </div>

                                                <div className="text-sm leading-6">
                                                    <a href="#"
                                                       className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                        Forgot password?
                                                    </a>
                                                </div>
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                            <div className="mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200"/>
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
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
                                        <span className="text-sm font-semibold leading-6"
                                              onClick={() => signIn("google")}>Google</span>
                                    </a>

                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                                    >
                                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold leading-6"
                                              onClick={() => signIn("github")}>GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1950&q=80"
                        alt=""
                    />
                </div>
            </main>

    );
};

export default LoginPage;