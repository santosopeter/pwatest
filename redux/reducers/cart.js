const defaultState = {
    cart: [],
};

const cartReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD':
            const existingProduct = state.cart.filter((product) => product.id === action.payload.id);

            console.log(state.cart);

            if(existingProduct.length > 0) {
                const withoutExistingProduct = state.cart.filter(
                    (product) => product.id !== action.payload.id
                );
                const updatedUnitsProduct = {
                    ...existingProduct[0],
                    qty: existingProduct[0].qty + action.payload.qty,
                };

                return {
                    ...state,
                    cart: [...withoutExistingProduct, updatedUnitsProduct],
                };
            } 
            else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                };
            }
        case 'REMOVE':
            console.log("product removed");
            const withoutDeletedProduct = state.cart.filter(
                (product) => product.id !== action.payload.id
            );
            return {
                ...state,
                cart: withoutDeletedProduct,
            };
        default:
            return state;
    }
}
export default cartReducer; 