import {useGetCartByIdQuery} from "@/redux/service/cart";
import {useGetProductByIdQuery} from "@/redux/service/product";

type CartPageComponentProps = {
    carts: any;
}

type ProductComponentProps = {
    productId: string;
}

const ProductComponent = ({productId}: ProductComponentProps) => {
    const { data: productData, error: productError, isLoading: productIsLoading } = useGetProductByIdQuery(productId);

    if (productIsLoading) return <div>Loading...</div>;

    const productStyle = {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        margin: '10px'
    };

    const imageStyle = {
        width: '100%',
        height: 'auto'
    };

    return (
        <div style={productStyle}>
            <h2>{productData.name}</h2>
            <img style={imageStyle} src={productData.image} alt={productData.name} />
        </div>
    );
}

const CartPageComponent = ({carts}:CartPageComponentProps) => {
    if (!carts) {
        return null
    }
    console.log('Cart Page', carts.results);

    return (
        <div>
            <h1>Cart Page</h1>
            {carts.results.map((cart, index) => (
                <ProductComponent key={index} productId={cart.order_items[0].product} />
            ))}
        </div>
    );
}

export default CartPageComponent;