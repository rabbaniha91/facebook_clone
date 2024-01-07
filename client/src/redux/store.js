import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReduseer from './redusers';

const initialState = {};

const middlewares = [thunk];

const store = createStore(
  rootReduseer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);


export default store;