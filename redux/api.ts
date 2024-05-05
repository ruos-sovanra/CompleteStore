// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import {setAccessToken} from "@/redux/feature/auth/authSlice";
import {getSession, useSession} from "next-auth/react";

// initialize an empty api service that we'll inject endpoints into later as needed

// Setting up prepareHeaders to include the token in the headers
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders : async (headers) => {
        const session= await getSession();
        if (session) {
            headers.set("authorization", `Bearer ${session?.user?.email}`);
        }
        return headers;
    },
});


// args: for the request details // api: for Redux api object // extraOptions: for additional
const BaseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const session= await getSession();
        console.log('sessionapi', session)
        if (session){
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}token/refresh/`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({refresh: session?.user?.name})
            });
            const resultResponse = await response.json();
            console.log('resultResponse', resultResponse)
            if(resultResponse?.access){
                console.log('refresh token success')
                const refreshedResult = await fetchBaseQuery({
                    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
                    prepareHeaders : async (headers) => {
                        const session= await getSession();
                        console.log('after refreshed', session)
                        if (session) {
                            headers.set("authorization", `Bearer ${resultResponse.access}`);
                        }
                        return headers;
                    },
                })(args, api, extraOptions);
                return refreshedResult;
            }else {
                console.error("refresh token failed");
                return result;
            }
        }
    }
    return result;
};


export const ecommerceApi = createApi({
    reducerPath: "ecommerceApi",
    baseQuery: BaseQueryWithReAuth,
    endpoints: () => ({}),
});
