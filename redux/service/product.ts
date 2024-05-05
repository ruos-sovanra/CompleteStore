import {ecommerceApi} from "@/redux/api";

// Define a service using a base URL and expected endpoints
export const productApi = ecommerceApi.injectEndpoints({// The name of the slice of state that will be managed by this api
    endpoints: (builder) => ({
        // get all products
        //                        <result type,         args type>
        getProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 1, pageSize = 10}) =>
                `products/?page=${page}&page_size=${pageSize}`,
        }),
        // get single product
        getProductById: builder.query<any, number>({
            query: (id) => `products/${id}/`,
        }),
        getProductByProfile: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 1, pageSize = 10}) =>
                `products/?page=${page}&page_size=${pageSize}`,
        }),
// create a product
        createProduct: builder.mutation<any, { newProduct: object }>({
            query: ({newProduct}) => ({
                url: "products/",
                method: "POST",
                body: newProduct,
            }),
        }),

// page.tsx a product
        updateProduct: builder.mutation<
            any,
            { id: number; updatedProduct: object }
        >({
            query: ({id, updatedProduct}) => ({
                url: `products/${id}/`,
                method: "PATCH",
                body: updatedProduct,
            }),
        }),
        // delete a product
        deleteProduct: builder.mutation<any, { id: number; }>({
            query: ({id}) => ({
                url: `products/${id}/`,
                method: "DELETE",
            }),
        }),
        getMyProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 1, pageSize = 10}) =>
                `products/my_products/?page=${page}&page_size=${pageSize}`,

        }),
        getProductImages: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 1, pageSize = 10}) =>
                `file/product/?page=${page}&page_size=${pageSize}`,
        }),
        getCategoryImages: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 1, pageSize = 10}) =>
                `file/icon/?page=${page}&page_size=${pageSize}`,
        }),
        uploadImage: builder.mutation<any, { data: object }>({
            query: ({data}) => ({
                url: "file/product/",
                method: "POST",
                body: data,
            }),
        }),
        uploadCategoryImage: builder.mutation<any, { data: object }>({
            query: ({data}) => ({
                url: "file/icon/",
                method: "POST",
                body: data,
            }),
        }),



    }),
});
// Export hooks for usage in components, which are
export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetMyProductsQuery,
    useGetProductImagesQuery,
    useGetCategoryImagesQuery,
    useUploadImageMutation,
    useUploadCategoryImageMutation
} = productApi;