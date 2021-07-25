import * as ActionTypes from './ActionTypes';

export const productReducer = (state={
    isLoading :false, 
    errMess: null,
    product:[]
},action)=>{
    switch(action.type){
        
        case (ActionTypes.PRODUCTS_FAILURE):
            return {...state,isLoading: false, errMess:action.message,category:[]};
        
        case(ActionTypes.ADD_PRODUCT):
            return{...state,isLoading:false,errMess:null,product:action.payload}
        default:
            return state;
    }
};