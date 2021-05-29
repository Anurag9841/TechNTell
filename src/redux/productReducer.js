import * as ActionTypes from './ActionTypes';

export const productReducer = (state={
    isLoading :false, 
    errMess: null,
    product:[]
},action)=>{
    switch(action.type){
        case (ActionTypes.PRODUCT_FAILED):
            return {...state,isLoading: false, errMess:action.message,product:[]};
        case(ActionTypes.PRODUCT_SUCCESS):
            return{...state,isLoading:false,errMess:null,product:[]};
        case(ActionTypes.ADD_PRODUCT):
            return{...state,isLoading:false,errMess:null,product:action.payload}
        default:
            return state;
    }
}