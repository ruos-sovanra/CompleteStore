
'use client'

import {useState} from "react";
import {AiOutlineCaretDown, AiOutlineCaretUp} from "react-icons/ai";
import Image from "next/image";
import {useGetProductImagesQuery} from "@/redux/service/product";

const TestPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return <div className="h-screen grid place-content-center">
            <div className="relative flex flex-col items-center w-[340px] h-[340px] rounded-lg">
                <button onClick={() => setIsOpen((prev)=>!prev)} className="bg-blue-600 p-4 w-full items-center flex justify-between font-bold text-xl rounded-lg tracking-wider border-4 border-transparent active:border-white duration-500 active:text-white">
                    button
                    {!isOpen ? (
                        <AiOutlineCaretDown className="h-8" />
                    ) : (
            <AiOutlineCaretUp className="h-8" />)}
                </button>
                {isOpen &&
                    <div className="absolute bg-blue-600 top-20 flex flex-coln items-start rounded-lg p-5 w-full">
                        <div className="flex w-full justify-between hover:bg-blue-200 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4">
                            <h1 className="grid place-content-center font-bold text-xl">hello</h1>
                            <Image src="https://store.istad.co/media/product_images/red_shirt_women.png" alt="" width={55} height={55}/>
                        </div>

                    </div>}
            </div>
    </div>
}

export default TestPage;