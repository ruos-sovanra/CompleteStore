import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {addToCart, selectProducts} from "@/redux/feature/cart/cartSlice";

type CardProductProps = {
    image: string;
    name: string;
    price: number;
    onClick?: () => void;
    seller: string;
    id:number
}
const CardProduct = ({id,image, name,seller, price,onClick}:CardProductProps) =>{
    const dispatch = useAppDispatch();

    return (

            <section className="card" >
                <div className="image-container">
                    <img className="w-full h-full object-cover"
                         src={image} alt={name}/>
                </div>
                <div className="flex flex-col gap-3 p-5">
                    {/*badge*/}
                    <div className="flex items-center gap-2">
                        <p className="badge">Stock Ready</p>
                        <span className="badge">{seller}</span>
                    </div>
                    <h2 className="product-title" title="Best Product Ever">
                        {name}
                    </h2>
                    <div>
                    <span className="text-xl font-bold">
                        ${price}
                    </span>
                    </div>
                    <div className="mt-5 flex gap-2">
                        <button onClick={()=> dispatch(addToCart({id,name,image,price}))} className="button-style">Add to Cart</button>
                    </div>
                </div>
            </section>
    )
}

export default CardProduct;