import * as ActionTypes from './ActionTypes';

export const CommentReducer = (state={
    isLoading:false,
    errMess: null,
    comments:[]
},action) => {
    switch(action.type){
        case ActionTypes.COMMENT_LOADING:
            return{...state,isLoading:true};
        case ActionTypes.COMMENT_FAILURE:
            return{...state,isLoading:false,errMess:action.errmsg,comments:[]};
        case ActionTypes.ADD_COMMENT:
            return{...state,isLoading:false,errMess:action.errmsg,comments:action.payload};
        default:
            return state;
    }
};
