export type FormDataRegister = {
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name: string;
}
export type FormDataCreate = {
    category: {
        name: string;
        icon: string;
    };
    name: string;
    desc: string;
    image ?: string;
    price: string;
    quantity: string;
}
export type FormDataUpdate = {readonly id: number, category: {name: any}, name: string, desc: string, image?: string, price: string, quantity: string, seller: string, fileProduct: any}
export type FormDelete = {
    readonly id: string;
    category: {
        name: any;
    };
    name: string;
    desc: string;
    image ?: string;
    price: string;
    quantity: string;
    seller: string;
}
export type ProductType = {
    category: {
        name: string;
        icon: string;
    };
     id: number;
    name: string;
    desc: string;
    image ?: string;
    price: string;
    quantity: string;
    seller: string;
}
export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    seller: string;
}

export const BASE_URL = "https://store.istad.co"