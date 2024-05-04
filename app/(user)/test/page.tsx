'use client'

import { useAppDispatch } from "@/redux/hook";
import {useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation} from "@/redux/service/cart";
import {addToCart, removeFromCart} from "@/redux/feature/cart/cartSlice";
import CartPageComponent from "@/Components/cartPage/CartPageComponent";

const TestPage =() => {
    const [addProductToCart, { isLoading: isAdding }] = useAddToCartMutation();
    const [removeProductFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
    const { data, error, isLoading } = useGetCartQuery({ page: 1, pageSize: 10 });
    const dispatch = useAppDispatch();
    console.log('Test Page', data);

    // Define a mock product object
    const mockProduct = { id: 141, quantity: 1 };

    const handleAddToCart = async () => {
        try {
            // Pass the mock product to the addProductToCart function
            const result = await addProductToCart(mockProduct).unwrap();
            dispatch(addToCart(result));
        } catch (error) {
            console.error('Failed to add product to cart: ', error);
        }
    };

    const handleRemoveFromCart = async () => {
        // Define a mock product id
        const mockProductId = 4;

        try {
            // Pass the mock product id to the removeProductFromCart function
            await removeProductFromCart(mockProductId).unwrap();
            dispatch(removeFromCart({ id: mockProductId }));
        } catch (error) {
            console.error('Failed to remove product from cart: ', error);
        }
    };

    console.log('Test Page', isAdding);

    return (
        <div className="h-screen grid place-content-center">
            <CartPageComponent carts={data} />
            <button onClick={handleAddToCart}>Add Mock Product to Cart</button>
            <button onClick={handleRemoveFromCart}>Remove Product from Cart</button>
            Test Page
        </div>
    )
}

export default TestPage;