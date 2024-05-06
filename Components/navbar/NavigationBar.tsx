import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import {FiShoppingCart} from "react-icons/fi";
import Link from "next/link";


const NavigationBar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();



    return (
        <nav>

            {session ? (
                <div onClick={() => setDropdownOpen(!dropdownOpen)} className="relative">
                    <Image src={session?.user?.image || 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'} alt="Profile" className="rounded-full h-8 w-8" width={200} height={200}/>
                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                            <div className="py-1">
                                <a onClick={() => signOut()}
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center">
                    <Link href={'/cart'}>
                        <FiShoppingCart className="mr-2" size={30} />
                    </Link>
                    <button onClick={() => router.push('/auth/login')}
                            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                        Sign In
                    </button>
                </div>
            )}

        </nav>
    );
};

export default NavigationBar;
