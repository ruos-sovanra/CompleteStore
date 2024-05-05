'use client'

import { useAppDispatch } from "@/redux/hook";
import {useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation} from "@/redux/service/cart";
import CartPageComponent from "@/Components/cartPage/CartPageComponent";

const TestPage =() => {
    const { data, error, isLoading } = useGetCartQuery({ page: 1, pageSize: 10 });

    return (
        <main>
            <CartPageComponent carts={data} />
            Test Page
        </main>
    )
}

export default TestPage;