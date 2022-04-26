import { Action } from "redux";
import { createAction } from "redux-act";
import { ThunkDispatch } from "redux-thunk";

export const FETCH_TODOS_INIT = createAction("FETCH_TODOS_INIT");
export const FETCH_TODOS_FAIL = createAction<any | string>("FETCH_TODOS_FAIL");
export const FETCH_TODOS_SUCCESS = createAction<any | []>(
  "FETCH_TODOS_SUCCESS",
);

export const fetchTodos = (): any => {
  return async (
    dispatch: ThunkDispatch<MediaSessionPlaybackState, void, Action>,
  ) => {
    dispatch(FETCH_TODOS_INIT());
    let todos: [];
    try {
      const response = await fetch(
        "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list",
      );
      const data = await response.json();
      todos = data;
    } catch (err) {
      const errorMessage = "Error";
      return dispatch(FETCH_TODOS_FAIL({ errorMessage }));
    }
    return dispatch(FETCH_TODOS_SUCCESS({ list: todos }));
  };
};
