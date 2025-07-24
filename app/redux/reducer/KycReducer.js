// src/redux/reducers/kycReducer.js
import { KYC_FAILURE, KYC_REQUEST, KYC_SUCCESS } from "../action";

// Initial state
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// Reducer
const kycReducer = (state = initialState, action) => {
  switch (action.type) {
    case KYC_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case KYC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case KYC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "Something went wrong",
      };
    default:
      return state;
  }
};

export default kycReducer;
