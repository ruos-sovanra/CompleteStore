
import ProductComponent from "@/Components/cartPage/CartLayout";

interface OrderItem {
    cost: number;
    price: number;
    product: number;
    quantity: number;
    order:number;

}

interface CartItem {
    id: number;
    order_items: OrderItem[];
    total_cost: number;
}

type CartPageComponentProps = {
    carts: {
        results: CartItem[];
    };
}


const CartPageComponent = ({carts}:CartPageComponentProps) => {
    // Create a state variable for the total price of all products

    if (!carts) {
        return null;
    }

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

                <form className="mt-12">
                    <div>
                        <h2 className="sr-only">Items in your shopping cart</h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {carts.results.map((cart, index) => (
                                <ProductComponent key={index} productId={cart.order_items[0].product}
                                                  price={cart.order_items[0].price}
                                                  quantity={cart.order_items[0].quantity} total={cart.total_cost}
                                                  orderId={cart.order_items[0].order}/>
                            ))}
                        </ul>
                    </div>

                    {/* Order summary */}
                    <div className="mt-10 sm:ml-32 sm:pl-6">
                        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="sr-only">Order summary</h2>

                            <div className="flow-root">
                                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">$99.00</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Shipping</dt>
                                        <dd className="font-medium text-gray-900">$5.00</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Tax</dt>
                                        <dd className="font-medium text-gray-900">$8.32</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">$112.32</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                                or
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CartPageComponent;