'use client';
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import NavigationBar from "@/Components/navbar/NavigationBar";
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import {cookies} from "next/headers";

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onToggleMenu = (event:any) => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className="flex justify-between items-center w-full px-8 mx-auto shadow-md  fixed top-0 z-50">
            <div>
                <img className="w-16 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png" alt="..." />
            </div>
            <div
                className={`nav-links duration-500 md:flex ${isMenuOpen ? "flex flex-col bg-white md:min-h-fit min-h-[60vh] absolute top-full right-0 md:w-auto  w-full items-start px-5" : "hidden"}`}>
                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li>
                        <Link className="hover:text-gray-500" href="/">Home</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href={'/shop'}>Shop</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="/about">About</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="/policy">Policy</Link>
                    </li>
                    <li className="md:hidden md:flex md:flex-col ">
                        <NavigationBar />
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden md:inline-flex">
                    <NavigationBar/>
                </div>
                <IoIosMenu onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden"/>
            </div>
        </nav>
    );
}

export default NavbarComponent;