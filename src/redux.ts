import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [
            {product: {
                name: 'String',
                price: 0,
                id: -1,
            }, quantity: 0},
        ],
        total: 0,
    },
    reducers: {
        addToCart(state, action) {
            // If item is already in cart, increment quantity
            const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            // Calculate total price with prices of each item multiplied by quantity
            state.total = state.items.reduce((acc, item) => acc + (item.product.price*item.quantity), 0);
        },
        removeFromCart(state, action) {
            // If item quantity is more than 1, decrement quantity, otherwise remove item
            const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
            if(existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
            } else {
                state.items = state.items.filter((item) => item.product.id !== action.payload.product.id);
            }

            state.total = state.items.reduce((acc, item) => acc + (item.product.price*item.quantity), 0);
        },
        clearCart(state) {
            state.items = [];
            state.total = 0;
            window.location.href = '/pause';
        },
    },
});

const cancelOrderModalSlice = createSlice({
    name: 'cancelOrderModal',
    initialState: {
        show: false,
    },
    reducers: {
        showCancelOrderModal(state) {
            state.show = true;
        },
        hideCancelOrderModal(state) {
            state.show = false;
        },
    },
});

const stepSlice = createSlice({
    name: 'step',
    initialState: {
        step: -1,
        actualProductId: -1
    },
    reducers: {
        incrementStep(state, action) {
            state.step++;
            state.actualProductId = action.payload;
        },
        decrementStep(state) {
            state.step--;
        },
        resetStep(state) {
            state.step = -1;
        }
    },
});

const ActualVariantsSlice = createSlice({
    name: 'actualVariants',
    initialState: {
        actualVariants: [
            {}
        ],
    },
    reducers: {
        addVariant(state, action) {
            state.actualVariants = [...state.actualVariants, action.payload];
        },
        resetActualVariants(state) {
            state.actualVariants = [];
        }
    },
});

export const store = configureStore({
    reducer: {
        cancelOrderModal: cancelOrderModalSlice.reducer,
        cart: cartSlice.reducer,
        step: stepSlice.reducer,
        actualVariants: ActualVariantsSlice.reducer,
    },
});

export const { showCancelOrderModal, hideCancelOrderModal } = cancelOrderModalSlice.actions;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const { incrementStep, decrementStep, resetStep } = stepSlice.actions;
export const { addVariant, resetActualVariants } = ActualVariantsSlice.actions;