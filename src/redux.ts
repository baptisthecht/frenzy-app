import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [
            {product: {
                name: '',
                price: 0,
                id: -1,
                variants: [{
                    name: '',
                    choice: '',
                    price: 0,
                }]
            }, quantity: 0},
        ],
        total: 0,
    },
    reducers: {
        addToCart(state, action) {
            // If item is already in cart AND same variants, increment quantity
            var totalVariantsPrice = 0;
            const productToAdd = action.payload.product;
            if (productToAdd.variants) {
                productToAdd.variants.map((variant: any) => {
                    totalVariantsPrice = variant.price ? variant.price + totalVariantsPrice : totalVariantsPrice;
                });
                const totalPrice: number = productToAdd.price + totalVariantsPrice;
                productToAdd.price = totalPrice;
            } else {
                totalVariantsPrice = 0;
            }

            const existingItem = state.items.find((item) => {
                const isSameProduct = item.product.id === action.payload.product.id;
                if (isSameProduct) {
                    // Check variants only if the products are the same
                    if (
                        item.product.variants &&
                        action.payload.product.variants &&
                        item.product.variants.length === action.payload.product.variants.length
                    ) {
                        // Compare each variant
                        const areVariantsEqual = item.product.variants.every(
                            (variant, index) =>
                                variant.choice === action.payload.product.variants[index]?.choice
                        );
            
                        return areVariantsEqual;
                    }
            
                    // If there are no variants or variant lengths don't match, consider them equal
                    return true;
                }
            
                return false;
            });
            
            if(existingItem) {
                existingItem.quantity++;
            }else{
                state.items.push({ ...action.payload, quantity: 1 });
            }
            
            // Calculate total price with prices of each item with their variant price multiplied by quantity
            state.total = state.items.reduce((acc, item) => acc + (item.product.price*item.quantity), 0);
        },
        removeFromCart(state, action) {
            // If item quantity is more than 1, decrement quantity, otherwise remove item
            const existingItem = state.items.find((item) => {
                const isSameProduct = item.product.id === action.payload.product.id;
                if (isSameProduct) {
                    // Check variants only if the products are the same
                    if (
                        item.product.variants &&
                        action.payload.product.variants &&
                        item.product.variants.length === action.payload.product.variants.length
                    ) {
                        // Compare each variant
                        const areVariantsEqual = item.product.variants.every(
                            (variant, index) =>
                                variant.choice === action.payload.product.variants[index]?.choice
                        );
            
                        return areVariantsEqual;
                    }
            
                    // If there are no variants or variant lengths don't match, consider them equal
                    return true;
                }
            
                return false;
            });

            
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
        incrementItemQuantity(state, action) {
            const existingItem = state.items.find((item) => {
                const isSameProduct = item.product.id === action.payload.id;
                if (isSameProduct) {
                    // Check variants only if the products are the same
                    if (
                        item.product.variants &&
                        action.payload.variants &&
                        item.product.variants.length === action.payload.variants.length
                    ) {
                        // Compare each variant
                        const areVariantsEqual = item.product.variants.every(
                            (variant, index) =>
                                variant.choice === action.payload.variants[index]?.choice
                        );
            
                        return areVariantsEqual;
                    }
            
                    // If there are no variants or variant lengths don't match, consider them equal
                    return true;
                }
            
                return false;
            });
            if(existingItem) {
                existingItem.quantity++;
            }
            state.total = state.items.reduce((acc, item) => acc + (item.product.price*item.quantity), 0);
        },
        decrementItemQuantity(state, action) {
            const existingItem = state.items.find((item) => {
                const isSameProduct = item.product.id === action.payload.id;
                if (isSameProduct) {
                    // Check variants only if the products are the same
                    if (
                        item.product.variants &&
                        action.payload.variants &&
                        item.product.variants.length === action.payload.variants.length
                    ) {
                        // Compare each variant
                        const areVariantsEqual = item.product.variants.every(
                            (variant, index) =>
                                variant.choice === action.payload.variants[index]?.choice
                        );
            
                        return areVariantsEqual;
                    }
            
                    // If there are no variants or variant lengths don't match, consider them not equal
                    return true;
                }
            
                return false;
            });
            
            if(existingItem) {
                if(existingItem.quantity > 1){
                    existingItem.quantity--;
                }else{
                    if(existingItem.product.variants){
                        state.items = state.items.filter((item) => {
                            const isSameProduct = item.product.id === action.payload.id;
                            if (isSameProduct) {
                                // Check variants only if the products are the same
                                if (
                                    item.product.variants &&
                                    action.payload.variants &&
                                    item.product.variants.length === action.payload.variants.length
                                ) {
                                    // Compare each variant
                                    const areVariantsEqual = item.product.variants.every(
                                        (variant, index) =>
                                            variant.choice === action.payload.variants[index]?.choice
                                    );
    
                                    return !areVariantsEqual;
                                }
    
                                // If there are no variants or variant lengths don't match, consider them not equal
                                return true;
                            }
    
                            return true;
                        });
                    }else{
                        state.items = state.items.filter((item) => item.product.id !== action.payload.id);
                    }
                }
            }
            state.total = state.items.reduce((acc, item) => acc + (item.product.price*item.quantity), 0);
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
            state.actualProductId = -1;
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
            state.actualVariants.push(action.payload);
        },
        resetActualVariants(state) {
            state.actualVariants = [{}];
        }
    },
});

const variantProcessus = createSlice({
    name: 'variantProcessus',
    initialState: {
        variantProcessus: true,
    },
    reducers: {
        startVariantProcessus(state) {
            state.variantProcessus = true
        },
        endVariantProcessus(state) {
            state.variantProcessus = false
        }
    },
});

const whereToEatSlice = createSlice({
    name: 'whereToEat',
    initialState: {
        whereToEat: '',
        hereChoice: ''
    },
    reducers: {
        setWhereToEat(state, action) {
            state.whereToEat = action.payload;
        },
        setHereChoice(state, action) {
            state.hereChoice = action.payload;
        }
    },
});

const sleepTimeoutSlice = createSlice({
    name: 'sleepTimeout',
    initialState: {
        sleepTimeout: true,
    },
    reducers: {
        setSleepTimeout(state, action) {
            state.sleepTimeout = action.payload;
        },
    },
});

const confirmCartSlice = createSlice({
    name: 'confirmCart',
    initialState: {
        confirmCart: false,
    },
    reducers: {
        setConfirmCart(state, action) {
            state.confirmCart = action.payload;
        },
    },
});

export const store = configureStore({
    reducer: {
        cancelOrderModal: cancelOrderModalSlice.reducer,
        cart: cartSlice.reducer,
        step: stepSlice.reducer,
        actualVariants: ActualVariantsSlice.reducer,
        variantProcessus: variantProcessus.reducer,
        whereToEat: whereToEatSlice.reducer,
        sleepTimeout: sleepTimeoutSlice.reducer,
        confirmCart: confirmCartSlice.reducer,
    },
});



export const { showCancelOrderModal, hideCancelOrderModal } = cancelOrderModalSlice.actions;
export const { addToCart, removeFromCart, clearCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;
export const { incrementStep, decrementStep, resetStep } = stepSlice.actions;
export const { addVariant, resetActualVariants } = ActualVariantsSlice.actions;
export const { startVariantProcessus, endVariantProcessus } = variantProcessus.actions;
export const { setWhereToEat, setHereChoice } = whereToEatSlice.actions;
export const { setSleepTimeout } = sleepTimeoutSlice.actions;
export const { setConfirmCart } = confirmCartSlice.actions;