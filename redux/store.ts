import {configureStore} from "@reduxjs/toolkit";
import userProfileSlice from "@/redux/feature/userProfile/userProfileSlice";
import authSlice from "@/redux/feature/auth/authSlice";
import {ecommerceApi} from "@/redux/api";
import cartSlice from "@/redux/feature/cart/cartSlice";

export const makeStore = () => {
    return configureStore({
        reducer:{
            [ecommerceApi.reducerPath]: ecommerceApi.reducer,
            userProfile: userProfileSlice,
            auth: authSlice,
           cart: cartSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(ecommerceApi.middleware),
    });
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']
