import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import logger from "redux-logger";

import { AuthReducer } from "./AuthReducer";
import { UsersReducer } from "./UsersReducer";
import {productsReducer} from "./ProductsReducer";
import {OrderReducer} from "./OrderReducer";
import {OrderDetailsReducer} from "./OrderDetailsReducer"
import {CategoryReducer} from "./CategoryReducer";
import {productReducer} from "./productReducer";
import {categoryOnlyReducer} from "./categoryOnlyReducer"
export const configureStore =  () => {
    const store = createStore(
        combineReducers({
            auth: AuthReducer, 
            users: UsersReducer, 
            products: productsReducer,
            order: OrderReducer,
            orderDetails: OrderDetailsReducer,
            categorys: CategoryReducer,
            product: productReducer,
            category: categoryOnlyReducer
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
