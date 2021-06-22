import * as ActionTypes from "./ActionTypes";

export const OrderDetailsReducer = (state={
    isLoading : false,
    errmsg : null,
    orderdetails:[]
},action) =>{
    switch(action.types){
        case(ActionTypes.ORDERDETAILS_FALURE):
            return {...state,isLoading : false, errmsg : action.payload, orderdetails : []};
        case(ActionTypes.ADD_ORDERDETAILS):
            return {...state,isLoading : false, errmsg : null, orderdetails : action.payload};
        default:
            return state;
    }
}