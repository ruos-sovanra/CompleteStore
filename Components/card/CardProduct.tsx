'use client'
import {useAddToCartMutation} from "@/redux/service/cart";
import Image from "next/image";

type CardProductProps = {
    image: string;
    name: string;
    price: number;
    onClick?: () => void;
    seller: string;
    id:number
}
const CardProduct = ({id,image, name,seller, price,onClick}:CardProductProps) =>{
    const [addProductToCart, { isLoading: isAdding }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        try {
            await addProductToCart({id:id,quantity:1}).unwrap();
        } catch (error) {
            console.error('Failed to add product to cart: ', error);
        }
    }

    return (

        <section>
            <div className="relative cursor-pointer" onClick={onClick}>
                <div className="relative h-72 w-full overflow-hidden rounded-lg ">
                    <Image
                        width={300}
                        height={300}
                        priority
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">{name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Black and White</p>
                </div>
                <div
                    className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">{price}</p>
                </div>
            </div>
            <div className="mt-6">
                <button
                    onClick={handleAddToCart}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                    Add to bag
                </button>
            </div>
        </section>

)
}

export default CardProduct;