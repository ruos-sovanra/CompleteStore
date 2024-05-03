'use client'

import {Product} from "@/libs/difinition";
import CardProduct from "@/Components/card/CardProduct";
import { useRouter } from "next/navigation";
import {useGetProductsQuery} from "@/redux/service/product";
import {useState} from "react";


const ProductPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isFetching } = useGetProductsQuery({
        page: page,
        pageSize: 10
    });
        const products: Product[] = data?.results || [];
    const total: number = data?.total || 0;
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(total / 10);

    const generatePageNumbers = (currentPage: number) => {
        const pageNumbers = [];
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > 5) {
            if (currentPage <= 3) {
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <section className="container mx-auto">
            <h1 className="text-center text-4xl font-bold my-12">Our Popular Product</h1>
            <div className="flex flex-wrap justify-center gap-4">
                {products.map((product) => (
                    <CardProduct onClick={() => router.push(`/product/${product.id}`)} key={product.id}
                                 image={product.image} name={product.name} price={product.price}
                                 seller={product.seller}/>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}
                        className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50">
                    Previous
                </button>
                {generatePageNumbers(page).map((pageNumber) => (
                    <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 ${page === pageNumber ? 'bg-gray-200' : ''}`}>
                        {pageNumber}
                    </button>
                ))}
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50">
                    Next
                </button>
            </div>
        </section>
    );
}
export default ProductPage;