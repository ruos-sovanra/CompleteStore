import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartProduct {
	id: number;
	quantity: number;
}

interface CartState {
	products: CartProduct[];
}

const initialState: CartState = {
	products: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProduct>) => {
			const productInCart = state.products.find(product => product.id === action.payload.id);

			if (productInCart) {
				productInCart.quantity += action.payload.quantity;
			} else {
				state.products.push(action.payload);
			}
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.products = state.products.filter(product => product.id !== action.payload.id);
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;