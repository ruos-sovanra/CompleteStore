'use client'
import {useGetProductByIdQuery} from "@/redux/service/product";
import Image from "next/image";
import {
    useDecrementQuantityMutation,
    useIncrementQuantityMutation,
    useRemoveFromCartMutation
} from "@/redux/service/cart";
import {useAppDispatch} from "@/redux/hook";
import {useEffect, useState} from "react";

type ProductComponentProps = {
    productId: number;
    price:number;
    quantity:number;
    total: number;
    orderId:number;

}

const ProductComponent = ({productId,price,quantity,total,orderId}: ProductComponentProps) => {
    const { data: productData, error: productError, isLoading: productIsLoading } = useGetProductByIdQuery(productId);
    const [removeProductFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
    const [incrementQuantity, { isLoading: isIncrementing }] = useIncrementQuantityMutation();
    const [decrementQuantity, { isLoading: isDecrementing }] = useDecrementQuantityMutation();
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const [currentTotal, setCurrentTotal] = useState(total);
    const [removed, setRemoved] = useState(false);
    const handleIncreaseQuantity = async () => {
        try {
            const newQuantity = currentQuantity + 1;
            await incrementQuantity({ orderId: orderId, productId: productId, quantity: newQuantity }).unwrap();
            // Update the quantity state
            setCurrentQuantity(newQuantity);
        } catch (error) {
            console.error('Failed to increase quantity: ', error);
        }
    };

    const handleDecreaseQuantity = async () => {
        if (currentQuantity > 1) {
            try {
                const newQuantity = currentQuantity - 1;
                await decrementQuantity({ orderId: orderId, productId: productId, quantity: newQuantity }).unwrap();
                // Update the quantity state
                setCurrentQuantity(newQuantity);
            } catch (error) {
                console.error('Failed to decrease quantity: ', error);
            }
        }
    };


    const handleRemoveFromCart = async (event:any) => {
        event.preventDefault();
        try {
            // Pass the mock product id to the removeProductFromCart function
            await removeProductFromCart(orderId);
            setRemoved(true);
        } catch (error) {
            console.error('Failed to remove product from cart: ', error);
        }
    };

    useEffect(() => {
        setCurrentTotal(currentQuantity * price);

    }, [currentQuantity]);
    if (removed) {
        window.location.reload();
    }
    if (productIsLoading) return <div>Loading...</div>;
    return (
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <Image
                    src={productData.image} alt={productData.name} width={200} height={200}
                    priority
                    className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                />
            </div>

            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div>
                    <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                            <h3 className="text-sm">
                                <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                    {productData.name}
                                </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Black</p>
                            <p className="mt-1 text-sm text-gray-500">M</p>
                        </div>

                        <p className="text-right text-sm font-medium text-gray-900">{currentTotal}</p>
                    </div>

                    <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                        <div>
                            <button
                                onClick={handleDecreaseQuantity}
                                disabled={isDecrementing || currentQuantity === 0}
                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                -
                            </button>
                            <span className="mx-3 text-lg">{currentQuantity}</span>
                            <button
                                onClick={handleIncreaseQuantity}
                                disabled={isIncrementing}
                                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={(event) => handleRemoveFromCart(event)}
                            className="ml-4 text-xl font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                        >
                            Remove
                        </button>
                    </div>
                </div>

            </div>
        </li>
    );
}

export default ProductComponent;