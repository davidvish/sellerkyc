import { KYC_FAILURE, KYC_REQUEST, KYC_SUCCESS } from "./index";


export const kycRequest = () => ({
  type: KYC_REQUEST,
});

export const kycSuccess = (kycData) => ({
  type: KYC_SUCCESS,
  payload: kycData,
});

export const kycFailure = (error) => ({
  type: KYC_FAILURE,
  payload: error,
});


// Thunk login action
export const kycAction = (kyc) => {  
  return async (dispatch) => {
    try {
      dispatch(kycRequest());
      
      setTimeout(() => {
        dispatch(kycSuccess(kyc));
      }, 1000);
      
    } catch (error) {
      dispatch(kycFailure(error));
    }
  };
};
