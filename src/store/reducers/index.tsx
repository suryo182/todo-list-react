import { combineReducers } from "redux";
import { todosReducer } from "./todo";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
