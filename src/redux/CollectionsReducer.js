import * as ActionTypes from './ActionTypes';

export const CollectionsReducer = (state={
    isLoading:false,
    errMess: null,
    user_collections_info:null
},action) => {
    switch(action.type){
        case ActionTypes.PC_AND_CUSTOM_COLLECTIONS_LOADING:
            console.log("loading dispatched");
            return{...state,isLoading:true, errMess:null, user_collections_info:null};
        
            case ActionTypes.PC_AND_CUSTOM_COLLECTIONS_FAILURE:
            console.log("failure dispatched");

            return{...state,isLoading:false,errMess:action.errmsg,user_collections_info:null};
        
            case ActionTypes.PC_AND_CUSTOM_COLLECTIONS_SUCCESS:
            console.log("success dispatched");

            return{...state,isLoading:false,errMess:null,user_collections_info:action.payload};
// --

            

        default:
            return state;
    }
};
