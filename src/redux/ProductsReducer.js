import * as ActionTypes from './ActionTypes';

export const productReducer = (state={
    isLoading :false, 
    errMess: null,
    product:[]
},action)=>{
    switch(action.type){
        case ActionTypes.PRODUCTS_LOADING:
            return{...state,isLoading: true}
        
        case (ActionTypes.PRODUCTS_FAILURE):
            return {...state,isLoading: false, errMess:action.message,product:[]};
        
        case(ActionTypes.ADD_PRODUCT):
            return{...state,isLoading:false,errMess:null,product:action.payload}
        default:
            return state;
    }
};