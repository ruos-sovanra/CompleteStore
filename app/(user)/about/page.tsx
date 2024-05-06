import { Metadata } from 'next'
import React from 'react'
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Us",
    description: "this is about us page",
    openGraph:{
        type:"website",
        url:"https://ecommerce.sovanra.me/",
        title:"CSTAD Ecommerce",
        description:"this is about us page",
        images:"https://img.etimg.com/thumb/width-1200,height-900,imgsize-2305723,resizemode-75,msid-94767324/tech/technology/ecommerce-user-base-in-india-to-outpace-us-in-two-years-bain-report.jpg",
    },
}
const people = [
    {
        id: 1,
        name: 'Ruos Sovanra',
        role: 'Front-end Developer',
        imageUrl:
            'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        id: 2,
        name: 'Phiv Lyhou',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        id: 3,
        name: 'Hout Sovanrarith',
        role: 'Front-end Developer',
        imageUrl:
            'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        twitterUrl: '#',
        linkedinUrl: '#',
    },

    // More people...
]


export default function AboutPage() {
    return (
        <main className='container mx-auto mt-20 px-4 sm:px-6 lg:px-8'>
            <section className='flex flex-wrap lg:flex-nowrap lg:justify-between border-1'>
                <div className='w-full lg:w-1/2'>
                    <Image src="https://hips.hearstapps.com/hmg-prod/images/artboard-2-65cf7d70bb76c.png?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*" alt="about" width={200} height={200} className="w-full" />
                </div>
                <div className='flex justify-center items-center w-full lg:w-1/2 md:ps-10'>
                    <div>
                        <p className='text-center text-lg sm:text-xl lg:text-2xl font-bold text-black'>Who We Are</p>
                        <p className='leading-7'>Welcome to  Ecommerce, where we are dedicated to making your online shopping experience as seamless and enjoyable as possible. Our journey began with a simple idea: to provide customers with a diverse selection of high-quality products at competitive prices, all from the convenience of their homes.</p>
                    </div>
                </div>
            </section>
            <section className='mt-10'>
                <h2 className='text-center text-lg sm:text-xl lg:text-2xl font-bold text-black'>Our Mission</h2>
                <p className='leading-7 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in eli</p>
            </section>
            <section className='mt-10'>
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                We’re a dynamic group of individuals who are passionate about what we do and dedicated
                                to delivering the
                                best results for our clients.
                            </p>
                        </div>
                        <ul
                            role="list"
                            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                        >
                            {people.map((person) => (
                                <li key={person.name}>
                                    <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={person.imageUrl}
                                         alt=""/>
                                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-base leading-7 text-gray-600">{person.role}</p>
                                    <ul role="list" className="mt-6 flex gap-x-6">
                                        <li>
                                            <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Twitter</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                                     viewBox="0 0 20 20">
                                                    <path
                                                        d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">LinkedIn</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                                     viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}