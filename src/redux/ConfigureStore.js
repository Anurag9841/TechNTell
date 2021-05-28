import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import  logger  from "redux-logger";

import { AuthReducer } from "./AuthReducer";

export const configureStore =  () => {
    const store = createStore(
        combineReducers({
            auth: AuthReducer
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}

