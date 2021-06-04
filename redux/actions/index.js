export const addProduct = (item) => {
    return {
        type: 'ADD',
        payload: item
    };
};
export const removeProduct = (item) => {
    return {
        type: 'REMOVE',
        payload: item
    };
};