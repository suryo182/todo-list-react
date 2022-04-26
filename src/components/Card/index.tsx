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
import { useRef, useState } from "react";

interface Todo {
  todo?: any;
  handleOnDelete?: any;
  handleOnEdit?: any;
  handleOnDone?: any;
  disableActions?: boolean;
}

const Card = ({
  todo,
  handleOnDelete,
  handleOnEdit,
  handleOnDone,
  disableActions,
}: Todo) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<any | {}>({
    isOpen: false,
    isEdit: false,
    modalTitle: "",
  });

  const [deleteModal, setDeleteModal] = useState<any | {}>({
    isOpen: false,
  });

  const [isDoneModal, setIsDoneModal] = useState<any | {}>({
    isOpen: false,
  });

  const onClose = () => {
    setModal((prevState: any) => ({
      ...prevState,
      isOpen: false,
      isEdit: false,
    }));
    setDeleteModal((prevState: any) => ({
      ...prevState,
      isOpen: false,
    }));
    setIsDoneModal(false);
  };

  const onSave = () => {
    handleOnEdit(modal);
    setModal((prevState: any) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  return (
    <li
      className="flex justify-between items-center py-2 px-4 bg-slate-200 rounded-md cursor-pointer"
      key={todo.id}
      onClick={() => {
        setModal((prevState: any) => ({
          ...prevState,
          isOpen: true,
          ...todo,
        }));
      }}
    >
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isDoneModal?.isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Done</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <span className="text-base font-medium">
              Are you sure this item done?
            </span>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => handleOnDone(isDoneModal)}
            >
              Done
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modal?.isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal?.modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={modal.title}
                onChange={(e) =>
                  setModal((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                isReadOnly={modal?.isEdit ? false : true}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={modal.description}
                onChange={(e) =>
                  setModal((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                isReadOnly={modal?.isEdit ? false : true}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={deleteModal?.isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p className="text-sm font-normal">
              Are you sure you want to delete this?
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleOnDelete(deleteModal)}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div>
        <span className="text-base font-medium">{todo.title}</span>
        <p className="text-sm font-normal">{todo.description}</p>
      </div>
      {!disableActions && (
        <div className="flex gap-x-2">
          <Button
            colorScheme="red"
            className="border border-transparent hover:border-red-500 rounded-md bg-white py-1 px-4 duration-300 ease-out"
            onClick={() => {
              setDeleteModal((prevState: any) => ({
                ...prevState,
                isOpen: true,
                ...todo,
              }));
            }}
          >
            Delete
          </Button>
          <Button
            colorScheme="blue"
            className="border border-transparent hover:border-blue-500 rounded-md bg-white py-1 px-4 duration-300 ease-out"
            onClick={() => {
              setModal((prevState: any) => ({
                ...prevState,
                isOpen: true,
                isEdit: true,
                modalTitle: "Edit Todo",
                ...todo,
              }));
            }}
          >
            Edit
          </Button>
          <Button
            colorScheme="green"
            className="border border-transparent hover:border-blue-500 rounded-md bg-white py-1 px-4 duration-300 ease-out"
            onClick={() => {
              setIsDoneModal((prevState: any) => ({
                ...prevState,
                isOpen: true,
                ...todo,
              }));
            }}
          >
            Mark as Done
          </Button>
        </div>
      )}
    </li>
  );
};

export default Card;
