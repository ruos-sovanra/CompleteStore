import {ecommerceApi} from "@/redux/api";


export const cartApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        getCart: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 1, pageSize = 10}) =>
                `user/orders/?page=${page}&page_size=${pageSize}`,
        }),
        // get single product
        getCartById: builder.query<any, number>({
            query: (id) => `cart/${id}/`,
        }),
        getCartByProfile: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 1, pageSize = 10}) =>
                `user/orders/?page=${page}&page_size=${pageSize}`,
        }),
        addToCart: builder.mutation<any, { id: number; quantity: number }>({
            query: ({id, quantity}) => ({
                url: `user/orders/`,
                method: "POST",
                body: { order_items: [{product: id, quantity}] },
            }),
        }),
        removeFromCart: builder.mutation({
            query: (productId: number) => ({
                url: `user/orders/${productId}`,
                method: 'DELETE',
            }),
        }),
        incrementQuantity: builder.mutation<any, { orderId: number, productId: number, quantity: number }>({
            query: ({orderId, productId, quantity}) => ({
                url: `user/orders/${orderId}`,
                method: "PUT",
                body: {
                    order_items: [
                        {
                            product: productId,
                            quantity: quantity
                        }
                    ]
                },
            }),
        }),
        decrementQuantity: builder.mutation<any, { orderId: number, productId: number, quantity: number }>({
            query: ({orderId, productId, quantity}) => ({
                url: `user/orders/${orderId}`,
                method: "PUT",
                body: {
                    order_items: [
                        {
                            product: productId,
                            quantity: quantity
                        }
                    ]
                },
            }),
        }),

    }),
    overrideExisting: false,
});

export const { useGetCartQuery, useGetCartByIdQuery, useGetCartByProfileQuery,useAddToCartMutation,useRemoveFromCartMutation,useIncrementQuantityMutation,useDecrementQuantityMutation } = cartApi;