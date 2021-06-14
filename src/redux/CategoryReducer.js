import * as ActionTypes from './ActionTypes';

export const CategoryReducer = (state={
    isLoading:false,
    errMess: null,
    category:[]
},action) => {
    switch(action.type){
        case ActionTypes.CATEGORY_LOADING:
            return{...state,isLoading:true};
        case ActionTypes.CATEGORY_FAILURE:
            return{...state,isLoading:false,errMess:action.errmsg,category:[]};
        case ActionTypes.ADD_CATEGORY:
            return{...state,isLoading:false,errMess:action.errmsg,category:action.payload};
        default:
            return state;
    }
};
