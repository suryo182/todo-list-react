import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const configureStore = (initialState: any) => {
  const middlewares = [];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  middlewares.push(applyMiddleware(thunk));

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...middlewares),
  );

  return { store };
};
