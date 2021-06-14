import * as ActionTypes from "./ActionTypes";

export const OrderReducer = (state={
    isLoading : false,
    errmsg : null,
    order:[]
},action) =>{
    switch(action.types){
        case(ActionTypes.ORDER_FALURE):
            return {...state,isLoading :false, errmsg : action.payload, order : []};
        case(ActionTypes.ADD_ORDER):
            return {...state,isLoading : false, errmsg :null, order : action.payload};
        case(ActionTypes.DELETE_ORDER):
            return {...state,isLoading : false, errmsg : null, order:[] };
        default:
            return state;
    }
}