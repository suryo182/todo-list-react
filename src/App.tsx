import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Card from "./components/Card";
import { fetchTodos } from "./store/actions/todo";

function App() {
  const newDate = moment(new Date());
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [doneList, setDoneList] = useState<any | []>([]);
  const [todoList, setTodoList] = useState<any | []>([]);
  const [addTodoModal, setAddTodoModal] = useState<any | {}>({
    isOpen: false,
    modalTitle: "",
    title: "",
    createdAt: moment(newDate).format("YYYY-MM-DD HH:mm"),
    order: 0,
  });

  const { list } = useSelector(
    (state: any) => ({
      list: state.todos.list,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      const sortedTodos = list
        .filter((item: any) => item.status === 0)
        .sort(function (left: any, right: any) {
          return moment.utc(left.createdAt).diff(moment.utc(right.createdAt));
        });
      const sortedDone = list
        .filter((item: any) => item.status === 1)
        .sort(function (left: any, right: any) {
          return moment.utc(left.createdAt).diff(moment.utc(right.createdAt));
        });
      setTodoList(sortedTodos);
      setDoneList(sortedDone);
    }
  }, [list]);

  const handleOnAddTodo = () => {
    setTodoList([...todoList, addTodoModal]);
    setAddTodoModal((prevState: any) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const handleOnEdit = (todo: any) => {
    const todos = todoList.map((item: any) => {
      if (item.id === todo.id) {
        return todo;
      }
      return item;
    });
    setTodoList(todos);
  };

  const onClose = () => {
    setAddTodoModal((prevState: any) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const handleOnDelete = (todo: any) => {
    const remainTodos = todoList.filter((item: any) => item.id !== todo.id);
    setTodoList(remainTodos);
  };

  const handleOnDone = (todo: any) => {
    setDoneList([
      ...doneList,
      {
        ...todo,
        status: 1,
      },
    ]);

    const remainTodos = todoList.filter((item: any) => item.id !== todo.id);
    setTodoList(remainTodos);
  };

  return (
    <div className="container mx-auto mt-20">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={addTodoModal?.isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{addTodoModal?.modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={addTodoModal?.title}
                onChange={(e) =>
                  setAddTodoModal((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={addTodoModal?.description}
                onChange={(e) =>
                  setAddTodoModal((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnAddTodo}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <h1 className="text-center font-semibold text-2xl mb-12">
        React To Do List App
      </h1>

      <div className="flex justify-center mb-12">
        <button
          type="button"
          onClick={() => {
            setAddTodoModal((prevState: any) => ({
              ...prevState,
              isOpen: true,
            }));
          }}
          className="border border-transparent hover:border-gray-800 rounded-md bg-slate-200 py-1 px-4 duration-300 ease-out"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div>
          <span className="font-semibold text-xl text-gray-600 mb-4 block">
            Todo
          </span>
          <ul className="flex flex-col gap-y-1">
            {todoList.length > 0 ? (
              todoList.map((todo: any) => (
                <Card
                  todo={todo}
                  key={todo.id}
                  handleOnDelete={(e: any) => handleOnDelete(e)}
                  handleOnDone={(e: any) => handleOnDone(e)}
                  handleOnEdit={(e: any) => handleOnEdit(e)}
                  disableActions={todo.status === 1 ? true : false}
                />
              ))
            ) : (
              <span>No Todo Item found, please add!</span>
            )}
          </ul>
        </div>
        <div>
          <span className="font-semibold text-xl text-gray-600 mb-4 block">
            Done
          </span>
          <ul className="flex flex-col gap-y-1">
            {doneList.length > 0 &&
              doneList.map((todo: any) => (
                <Card
                  todo={todo}
                  key={todo.id}
                  handleOnDelete={(e: any) => handleOnDelete(e)}
                  handleOnDone={(e: any) => handleOnDone(e)}
                  handleOnEdit={(e: any) => handleOnEdit(e)}
                  disableActions={todo.status === 1 ? true : false}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
