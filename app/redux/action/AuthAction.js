import { 
  KYC_COMPLETE,
    KYC_UPDATE, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT 
} from "../action";


export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateKyc = (kycData) => ({
  type: KYC_UPDATE,
  payload: kycData,
});

export const completeKyc = () => ({
  type: KYC_COMPLETE,
});

// Thunk login action
export const loginAction = (userData) => {  
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      
      // Simulate API delay
      setTimeout(() => {
        dispatch(loginSuccess(userData));
      }, 1000);
      
    } catch (error) {
      dispatch(loginFailure("Login failed"));
    }
  };
};
