import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import logger from "redux-logger";

import { AuthReducer } from "./AuthReducer";
import { UsersReducer } from "./UsersReducer";
import {productReducer} from "./ProductsReducer";
import {OrderReducer} from "./OrderReducer";
import {OrderDetailsReducer} from "./OrderDetailsReducer"
import {CategoryReducer} from "./CategoryReducer";
export const configureStore =  () => {
    const store = createStore(
        combineReducers({
            auth: AuthReducer, 
            users: UsersReducer, 
            products: productReducer,
            order: OrderReducer,
            orderDetails: OrderDetailsReducer,
            category: CategoryReducer
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
