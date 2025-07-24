import { 
  LOGIN_FAILURE,
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGOUT 
  } from "../action";


const initialState = {
  isLoggedIn: false,
  loading: false,
  user: {
    mobile: '',
  },
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: {
          ...state.user,
          ...action.payload,
        },
        error: null,
      };

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
