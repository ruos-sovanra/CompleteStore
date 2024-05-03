'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

type PropsType = {
    results: any;
    setPage: (page: number) => void;
    page: number;
    selectedImage: ImageType | null;
    setSelectedImage: (image: any) => void;
}

type ImageType = {
    id: number;
    name: string;
    image: string;
}

const DropDownComponent = ({ results, setPage, page, selectedImage, setSelectedImage }: PropsType) => {
    const images: ImageType[] = results?.results || [];
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectChange = (selectedId: number) => {
        const selectedImage = images.find(image => image.id === selectedId);
        setSelectedImage(selectedImage);
    };

    const totalPages = Math.ceil(results?.total / 5);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, page - 1);
        let endPage = Math.min(totalPages, page + 2);

        // Ensure total pages is not less than 4
        if (totalPages > 4) {
            if (page <= 2) {
                endPage = 4;
            } else if (page + 2 >= totalPages) {
                startPage = totalPages - 3;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="relative flex flex-col items-center w-[340px] rounded-lg bg-white border border-black">
            <button onClick={() => setIsOpen(!isOpen)} className="p-4 w-full text-xl rounded-lg tracking-wider border-4 border-transparent active:border-black duration-500 active:text-black">
                Select Image
            </button>
            {isOpen && (
                <div className="absolute top-20 flex flex-col items-center rounded-lg p-5 w-full shadow-lg bg-white">
                    {images.map((image) => (
                        <button
                            key={image.id}
                            onClick={() => handleSelectChange(image.id)}
                            className="flex items-center w-full justify-between hover:bg-gray-200 cursor-pointer rounded-r-lg p-4 border-l-transparent hover:border-l-black border-l-4 transition-colors duration-200"
                        >
                            <Image src={image.image} alt={image.name} className="w-8 h-8 inline-block mr-2" width={50} height={50} />
                            {image?.name || "Default Name"}
                        </button>
                    ))}
                    <span className="h-[2px] w-full bg-black"></span>
                    <div className="flex items-center justify-center space-x-4 mt-4">
                        {generatePageNumbers().map((pageNumber, index) => (
                            <button key={index} onClick={() => setPage(pageNumber)}
                                    className={`px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 ${page === pageNumber ? 'bg-gray-200' : ''}`}>{pageNumber}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownComponent;