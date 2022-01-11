import * as React from "react";
import {
  PlusSmIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { Container, Spinner, Notification } from "../components";
import { ButtonIcon, DeleteModal } from "../components";
import ActivityEmptyState from "../assets/activity-empty-state.png";
import {
  StateStatus,
  ActionState,
  TypeActionState,
  DeleteModalState,
} from "../types/state";
import { ITodo } from "../types/todo";
import { utcToLocal } from "../lib/date";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface TodosState {
  status: StateStatus;
  data: Array<ITodo>;
  error: string;
}

const todosState: TodosState = {
  status: StateStatus.IDLE,
  data: [],
  error: "",
};

const actionState: ActionState = {
  status: StateStatus.IDLE,
  error: "",
  type: TypeActionState.CREATE,
};

const deleteModalState: DeleteModalState = {
  isOpen: false,
  dataId: 0,
  isLoading: false,
  item: "",
};

function Dashboard() {
  const [todos, setTodos] = React.useState<TodosState>(todosState);
  const [actionTodo, setActionTodo] = React.useState<ActionState>(actionState);
  const [deleteModal, setDeleteModal] =
    React.useState<DeleteModalState>(deleteModalState);
  const [isNotifOpen, setIsNotifOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    function getTodos() {
      setTodos({ ...todos, status: StateStatus.PENDING });
      fetch(
        "https://todo.api.devcode.gethired.id/activity-groups?email=wahyu_dr71@yahoo.com"
      )
        .then((res) => res.json())
        .then((todos) => {
          setTodos({
            ...todos,
            status: StateStatus.RESOLVED,
            data: todos.data,
          });
        })
        .catch(() =>
          setTodos({
            ...todos,
            status: StateStatus.REJECTED,
            error: "Something went wrong",
          })
        );
    }
    getTodos();
    return () => {
      setTodos(todosState);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function createTodo() {
    setActionTodo({
      ...actionTodo,
      type: TypeActionState.CREATE,
      status: StateStatus.PENDING,
    });
    try {
      const res = await fetch(
        "https://todo.api.devcode.gethired.id/activity-groups",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "New Activity",
            email: "wahyu_dr71@yahoo.com",
          }),
        }
      );
      const resObj = await res.json();
      const newTodo: ITodo = {
        id: resObj.id,
        title: resObj.title,
        created_at: resObj.created_at,
      };
      setActionTodo({ ...actionTodo, status: StateStatus.RESOLVED });
      setTodos({ ...todos, data: [newTodo, ...todos.data] });
    } catch (err) {
      setActionTodo({
        ...actionTodo,
        status: StateStatus.REJECTED,
        error: "Something went wrong",
      });
    }
  }

  async function deleteTodo(todoId: number) {
    setActionTodo({
      ...actionTodo,
      type: TypeActionState.DELETE,
      status: StateStatus.PENDING,
    });
    try {
      await fetch(
        `https://todo.api.devcode.gethired.id/activity-groups/${todoId}`,
        {
          method: "DELETE",
        }
      );
      setActionTodo({ ...actionTodo, status: StateStatus.RESOLVED });
      const newTodos: Array<ITodo> = todos.data.filter(
        (todo) => todo.id !== todoId
      );
      setTodos({ ...todos, data: newTodos });
      setDeleteModal({ ...deleteModal, isOpen: false });
      setIsNotifOpen(true);
    } catch (err) {
      setActionTodo({
        ...actionTodo,
        status: StateStatus.REJECTED,
        error: "Something went wrong",
      });
    }
  }

  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1
            data-cy="activity-title"
            className="text-base sm:text-4xl font-bold leading-6 sm:leading-[54px] text-[#111111]"
          >
            Activity
          </h1>
          <ButtonIcon
            data-cy="activity-add-button"
            variant="primary"
            onClick={createTodo}
            isLoading={
              actionTodo.type === TypeActionState.CREATE &&
              actionTodo.status === StateStatus.PENDING
            }
            isDisabled={
              actionTodo.type === TypeActionState.CREATE &&
              actionTodo.status === StateStatus.PENDING
            }
            icon={
              <PlusSmIcon className="font-semibold h-5 w-5 sm:h-8 sm:w-8" />
            }
          >
            Tambah
          </ButtonIcon>
        </div>
        {todos.status === StateStatus.RESOLVED && (
          <div className="mt-[49px] grid grid-cols-2 md:grid-cols-4 gap-5">
            {todos.data.map((todo: ITodo) => (
              <div data-cy="activity-item" key={todo.id}>
                <Link to={`/detail/${todo.id}`}>
                  <div
                    data-cy="activity-item"
                    className={clsx(
                      "flex flex-col justify-between w-full bg-white border-0 shadow-[0_6px_10px_0_rgba(0,0,0,0.1)] rounded-xl",
                      "px-[17px] pt-[12px] pb-[17px]  md:px-[27px] md:pt-[22px] md:pb-[25px] h-[150px] md:h-[234px]"
                    )}
                  >
                    <h3
                      data-cy="activity-item-title"
                      className="text-sm sm:text-lg text-secondary-1 font-bold leading-[21px] sm:leading-[27px]"
                    >
                      {todo.title}
                    </h3>
                    <div className="flex text-secondary-3 items-center justify-between bottom-0">
                      <div
                        data-cy="activity-item-date"
                        className="text-[10px] sm:text-sm font-medium leading-[15px] sm:leading-[21px]"
                      >
                        {utcToLocal(todo.created_at, "D MMMM YYYY")}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteModal({
                            ...deleteModal,
                            isOpen: true,
                            dataId: todo.id,
                            item: todo.title,
                          });
                        }}
                        data-cy="activity-item-delete-button"
                      >
                        <TrashIcon className="h-3 w-3 sm:h-6 sm:w-6" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        {todos.data.length === 0 && todos.status === StateStatus.RESOLVED && (
          <div
            className="mt-[147px] sm:mt-[65px] flex justify-center"
            data-cy="activity-empty-state"
          >
            <div className="lg:relative">
              <img
                src={ActivityEmptyState}
                alt="empty-state"
                className="w-full max-w-[767px] items-center"
              />
              <h1
                className={clsx(
                  "text-center font-semibold mt-[35px] lg:mt-0 right-[70px] top-[300px] text-secondary-2",
                  "text-base lg:text-2xl leading-6 lg:leading-9 lg:absolute"
                )}
              >
                Buat Activity Pertamamu
              </h1>
            </div>
          </div>
        )}
        {todos.status === StateStatus.PENDING && (
          <div className="flex flex-col h-[35rem] items-center justify-center">
            <Spinner size="h-8 w-8" color="text-primary" />
          </div>
        )}
      </div>
      {deleteModal.isOpen && (
        <DeleteModal
          feature="activity"
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          onDelete={deleteTodo}
          isLoading={
            actionTodo.status === StateStatus.PENDING &&
            actionTodo.type === TypeActionState.DELETE
          }
        />
      )}
      <Notification
        isNotifOpen={isNotifOpen}
        setIsNotifOpen={setIsNotifOpen}
        icon={<ExclamationCircleIcon className="h-6 w-6 text-[#00A790]" />}
        information="Activity berhasil dihapus"
      />
    </Container>
  );
}

export default Dashboard;
