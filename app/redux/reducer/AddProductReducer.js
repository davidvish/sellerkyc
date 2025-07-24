import { ADD_PRODUCT_FALIUER, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS } from "../action";


const initialState = {
  loading: false,
  product: [],
  error: null,
};

const addProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_PRODUCT_SUCCESS:
      return {
          ...state,
          loading: false,
          product: [...state.product, action.payload], // Append new product
        };
      case ADD_PRODUCT_FALIUER:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addProductReducer;
