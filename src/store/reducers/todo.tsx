import { createReducer } from "redux-act";

import {
  FETCH_TODOS_INIT,
  FETCH_TODOS_FAIL,
  FETCH_TODOS_SUCCESS,
} from "../actions/todo";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const todosReducer = createReducer(
  {
    [FETCH_TODOS_INIT.getType()]: () => ({
      ...initialState,
      loading: true,
    }),
    [FETCH_TODOS_SUCCESS.getType()]: (state: any, payload: any) => ({
      ...state,
      list: payload.list || [],
      loading: false,
      error: null,
    }),
    [FETCH_TODOS_FAIL.getType()]: (state: any, payload: any) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  },
  initialState,
);
