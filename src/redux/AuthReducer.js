// import { FadeIn } from 'react-scroll-motion';
import * as ActionTypes from './ActionTypes';

export const AuthReducer = (state = {
    isLoading :false, 
    
    isAuthenticated: localStorage.getItem('token') ? true: false,

    token: localStorage.getItem('token'),
    
    user: localStorage.getItem('creds')? JSON.stringify(localStorage.getItem('creds')): null,
    
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            
            return{...state,
                isLoading: true,
                isAuthenticated: false, 
                user: action.creds
            };
            break;
        
            case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state, 
                isLoading: false, 
                isAuthenticated: true,
                token: action.token
            }

            break;
        
            case ActionTypes.LOGIN_FAILURE:
            return {
                ...state, 
                isLoading: false,
                isAuthenticated: false,
                errMess: action.errMess
            }
            break;
        
            case ActionTypes.LOGOUT_REQUEST:
            return {
                ...state, 
                isLoading: true,
                isAuthenticated: true
            }
            
            case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state, 
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            }

            case ActionTypes.LOGOUT_FAILURE:
            return {
                ...state, 
                isLoading: false,
                errMess: action.errMess
            }
            
            default:
            return state;
            break;
    }
}