import { ADD_PRODUCT_FALIUER, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS } from ".";


export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = (productData) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload:productData,
});

export const addProductFaliuer = (error) => ({
  type: ADD_PRODUCT_FALIUER,
  payload: error,
});

export const AddProductAction = (product) => {
  console.log(product,"Product");
  
  return async (dispatch) => {
    dispatch(addProductRequest());

    try {
      // Simulate async process, or replace with real API call
      setTimeout(() => {
        dispatch(addProductSuccess(product));
      }, 1000);
    } catch (error) {
      dispatch(addProductFaliuer(error.message || "Failed to add product"));
    }
  };
};
