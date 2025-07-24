import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/AuthReducer';
import addProductReducer from '../reducer/AddProductReducer';
import kycReducer from '../reducer/KycReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: addProductReducer,
    kyc:kycReducer

  },
});
