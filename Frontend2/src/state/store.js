import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const enhancers = [applyMiddleware(thunk), composeWithDevTools()]

export const store = createStore(
    reducers,
    {},
    compose(...enhancers)
)