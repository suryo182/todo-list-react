import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./store/actions/todo";

function App() {
  const dispatch = useDispatch();
  const { list } = useSelector(
    (state: any) => ({
      list: state.todos.list,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (list) {
    console.log({ list });
  }
  return <div>Todo List App</div>;
}

export default App;
