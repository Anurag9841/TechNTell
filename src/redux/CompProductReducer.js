import * as ActionTypes from './ActionTypes';

export const CompProductReducer = (state = {
    isLoading: false,
    errmsg: null,
    compProducts: []
}, action) => {
    switch (action.type) {
        case (ActionTypes.COMPONENT_PRODUCTS_FAILURE):
            return {
                ...state,
                isLoading: false,
                errmsg: action.payload,
                compProducts: []
            }
        
        case (ActionTypes.COMPONENT_PRODUCTS_LOADING):
            return {
                ...state,
                isLoading: true,
                errmsg: null,
                compProducts: []
            }
        
        case (ActionTypes.ADD_COMPONENT_PRODUCTS):
            return {
                ...state,
                isLoading:false,
                errmsg: null,
                compProducts:action.payload
            }
        default:
            return state;
    }
}
