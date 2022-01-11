import * as React from "react";
import clsx from "clsx";
import {
  Container,
  ButtonIcon,
  Spinner,
  DeleteModal,
  Button,
} from "../components";
import { ITodo, ITodoItem } from "../types/todo";
import {
  StateStatus,
  DeleteModalState,
  ActionState,
  TypeActionState,
} from "../types/state";
import { Dialog, Transition, Listbox, Menu } from "@headlessui/react";
import {
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  PencilIcon,
  PlusSmIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  CheckIcon,
  SelectorIcon,
  ChevronLeftIcon,
} from "@heroicons/react/solid";
import { useParams, Link } from "react-router-dom";
import TodoEmptyState from "../assets/todo-empty-state.png";
import { PRIORITY_ITEM } from "../constants/item";

interface DetailTodo extends ITodo {
  todo_items: Array<ITodoItem>;
}

interface TodoState {
  status: StateStatus;
  data: DetailTodo;
  error: string;
}

interface ItemModalState {
  isLoading: boolean;
  isOpen: boolean;
  todoItem: ITodoItem;
  type: TypeActionState.CREATE | TypeActionState.UPDATE;
}

const todoItem: ITodoItem = {
  id: 0,
  title: "",
  activity_group_id: 0,
  is_active: false,
  priority: "very-high",
};

const detailTodo: DetailTodo = {
  id: 0,
  title: "",
  created_at: "",
  todo_items: [],
};

const todoState: TodoState = {
  status: StateStatus.IDLE,
  data: detailTodo,
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

const itemModalState: ItemModalState = {
  isLoading: false,
  isOpen: false,
  type: TypeActionState.CREATE,
  todoItem: todoItem,
};

function ItemModal(props: any) {
  const { itemModal, setItemModal, createItem, updateItem, isLoading } = props;
  const [item, setItem] = React.useState<ITodoItem>(itemModal.todoItem);
  const onClose = () => {
    setItemModal({ ...itemModal, isOpen: false, todoItem: { ...todoItem } });
  };
  let priorities = [];
  for (const property in PRIORITY_ITEM) {
    priorities.push({ ...PRIORITY_ITEM[property], key: property });
  }
  return (
    <Transition appear show={itemModal.isOpen} as={React.Fragment}>
      <Dialog
        open={itemModal.isOpen}
        onClose={onClose}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto "
      >
        <div
          className="min-h-screen flex justify-center items-center"
          data-cy="modal-add"
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={clsx(
                "w-full max-w-[320px] sm:max-w-[830px]",
                "transition-all transform bg-white shadow-xl rounded-xl"
              )}
            >
              <div className="px-[22px] sm:px-[30px] pt-[19px] pb-[17px] sm:pt-[24px] sm:pb-[19px] border-b">
                <div className="flex justify-between items-center">
                  <h1
                    data-cy="modal-add-title"
                    className="text-secondary-1 text-base sm:text-lg font-semibold leading-6 sm:leading-[27px]"
                  >
                    {`${
                      itemModal.type === TypeActionState.CREATE
                        ? "Tambah"
                        : "Edit"
                    } Item`}
                  </h1>
                  <button onClick={onClose}>
                    <XIcon className="h-6 w-6 text-secondary-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col px-[22px] sm:px-[30px] pt-[38px] pb-7 gap-[26px]">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="title"
                    className="text-xs font-medium leading-5 text-secondary-1"
                    data-cy="modal-add-name-title"
                  >
                    NAMA ITEM
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Tambahkan nama item"
                    value={item.title}
                    onChange={(e) =>
                      setItem({ ...item, title: e.target.value })
                    }
                    data-cy="modal-add-name-input"
                    className="focus:ring-primary focus:border-primary w-full text-sm sm:text-base leading-[21px] sm:leading-6 font-normal border-secondary-5 text-secondary-1 rounded py-3.5 px-5"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="title"
                    className="text-xs font-medium leading-5 text-secondary-1"
                    data-cy="modal-add-priority-title"
                  >
                    PRIORITY
                  </label>

                  <Listbox
                    value={item.priority}
                    onChange={(value) => setItem({ ...item, priority: value })}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button
                        data-cy="modal-add-priority-dropdown"
                        className="flex items-center relative py-3.5 px-5 w-full sm:w-[210px] bg-white rounded border focus:outline-none "
                      >
                        <div className="flex items-center">
                          <div
                            className={clsx(
                              "h-2 w-2 sm:h-3 sm:w-3 rounded-full mr-4",
                              PRIORITY_ITEM[item.priority].color
                            )}
                          ></div>
                          <div className="text-sm sm:text-base leading-[21px] sm:leading-6 text-secondary-1">
                            {PRIORITY_ITEM[item.priority].display}
                          </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      </Listbox.Button>
                      <Transition
                        as={React.Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full sm:w-[210px] py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-72 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {priorities.map((priority, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={clsx(
                                "flex justify-between items-center cursor-default select-none relative px-[17px] py-[14px]",
                                idx !== priorities.length - 1 && "border-b"
                              )}
                              value={priority.key}
                            >
                              <div className="ml-1 flex items-center">
                                <div
                                  className={clsx(
                                    "h-2 w-2 sm:h-3 sm:w-3 rounded-full mr-4",
                                    PRIORITY_ITEM[priority.key].color
                                  )}
                                ></div>
                                <div className="text-sm sm:text-base font-normal leading-[21px] sm:leading-6 text-secondary-6">
                                  {priority.display}
                                </div>
                              </div>
                              {item.priority === priority.key && (
                                <CheckIcon className="h-5 w-5 text-secondary-6" />
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
              <div className="px-[22px] sm:px-[30px] pt-[15px] pb-[19px] border-t">
                <div className="flex justify-end">
                  <Button
                    data-cy="modal-add-save-button"
                    variant="primary"
                    isDisabled={item.title.length === 0}
                    isLoading={isLoading}
                    onClick={() => {
                      if (itemModal.type === TypeActionState.CREATE) {
                        return createItem(item);
                      } else {
                        return updateItem(item);
                      }
                    }}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

function Todo() {
  const { todoId } = useParams();
  const sortMenus = ["Terbaru", "Terlama", "A-Z", "Z-A", "Belum Selesai"];
  const [todo, setTodo] = React.useState<TodoState>(todoState);
  const [actionTodo, setActionTodo] = React.useState<ActionState>(actionState);
  const [deleteModal, setDeleteModal] =
    React.useState<DeleteModalState>(deleteModalState);
  const [itemModal, setItemModal] =
    React.useState<ItemModalState>(itemModalState);
  const [activeSort, setActiveSort] = React.useState<number>(1);
  const [title, setTitle] = React.useState<string>("...");
  const [isTitleEdited, setIsTitleEdited] = React.useState<boolean>(false);
  const titleInput = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    function getTodo() {
      setTodo({ ...todo, status: StateStatus.PENDING });
      fetch(`https://todo.api.devcode.gethired.id/activity-groups/${todoId}`)
        .then((res) => res.json())
        .then((res) => {
          setTitle(res.title);
          setTodo({
            ...todo,
            data: res,
            status: StateStatus.RESOLVED,
          });
        })
        .catch(() =>
          setTodo({
            ...todo,
            status: StateStatus.REJECTED,
            error: "Something went wrong",
          })
        );
    }
    getTodo();
    return () => {
      setTodo(todoState);
    };
  }, [todoId]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    let newTodoItems: Array<ITodoItem> = [];
    switch (activeSort) {
      case 1:
        newTodoItems = todo.data.todo_items.sort((a, b) => b.id - a.id);
        break;
      case 2:
        newTodoItems = todo.data.todo_items.sort((a, b) => a.id - b.id);
        break;
      case 3:
        newTodoItems = todo.data.todo_items.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 4:
        newTodoItems = todo.data.todo_items.sort((a, b) => {
          if (a.title < b.title) {
            return 1;
          } else if (a.title > b.title) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 5:
        newTodoItems = todo.data.todo_items.sort(
          (a, b) => b.is_active - a.is_active
        );
        break;
    }
    setTodo({ ...todo, data: { ...todo.data, todo_items: newTodoItems } });
  }, [activeSort]); // eslint-disable-line react-hooks/exhaustive-deps

  async function createItem(item: ITodoItem) {
    setActionTodo({
      ...actionTodo,
      status: StateStatus.PENDING,
      type: TypeActionState.CREATE,
    });
    try {
      const res = await fetch(
        "https://todo.api.devcode.gethired.id/todo-items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activity_group_id: todoId,
            title: item.title,
            priority: item.priority,
          }),
        }
      );
      const resObj = await res.json();
      const newTodoItem: ITodoItem = {
        id: resObj.id,
        title: resObj.title,
        activity_group_id: resObj.activity_group_id,
        is_active: resObj.is_active,
        priority: resObj.priority,
      };
      setActionTodo({
        ...actionTodo,
        status: StateStatus.RESOLVED,
      });
      setItemModal(itemModalState);
      setTodo({
        ...todo,
        data: {
          ...todo.data,
          todo_items: [newTodoItem, ...todo.data.todo_items],
        },
      });
    } catch (err) {
      setActionTodo({
        ...actionTodo,
        status: StateStatus.REJECTED,
        error: "Something went wrong",
      });
    }
  }
  async function updateItem(item: ITodoItem) {
    setActionTodo({
      ...actionTodo,
      status: StateStatus.PENDING,
      type: TypeActionState.UPDATE,
    });
    try {
      const res = await fetch(
        `https://todo.api.devcode.gethired.id/todo-items/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: item.title,
            priority: item.priority,
          }),
        }
      );
      const resObj = await res.json();
      const newTodoItem: ITodoItem = {
        id: resObj.id,
        title: resObj.title,
        activity_group_id: resObj.activity_group_id,
        is_active: resObj.is_active,
        priority: resObj.priority,
      };
      const newTodoItems = todo.data.todo_items.map((item) => {
        if (item.id === newTodoItem.id) {
          return newTodoItem;
        } else {
          return item;
        }
      });
      setActionTodo({
        ...actionTodo,
        status: StateStatus.RESOLVED,
      });
      setItemModal(itemModalState);
      setTodo({
        ...todo,
        data: {
          ...todo.data,
          todo_items: newTodoItems,
        },
      });
    } catch (err) {
      setActionTodo({
        ...actionTodo,
        status: StateStatus.REJECTED,
        error: "Something went wrong",
      });
    }
  }
  async function deleteItem(itemId: number) {
    setActionTodo({
      ...actionTodo,
      type: TypeActionState.DELETE,
      status: StateStatus.PENDING,
    });
    try {
      await fetch(`https://todo.api.devcode.gethired.id/todo-items/${itemId}`, {
        method: "DELETE",
      });
      setActionTodo({ ...actionTodo, status: StateStatus.RESOLVED });
      const newTodoItems: Array<ITodoItem> = todo.data.todo_items.filter(
        (item) => item.id !== itemId
      );
      setTodo({ ...todo, data: { ...todo.data, todo_items: newTodoItems } });
      setDeleteModal({ ...deleteModal, isOpen: false });
    } catch (err) {
      setActionTodo({
        ...actionTodo,
        status: StateStatus.REJECTED,
        error: "Something went wrong",
      });
    }
  }

  async function ChangeItemStatus(itemId: number) {
    let selectedTodoItem: ITodoItem = todoItem;
    const newTodoItems: Array<ITodoItem> = todo.data.todo_items.map((item) => {
      if (item.id === itemId) {
        item.is_active = !item.is_active;
        selectedTodoItem = item;
      }
      return item;
    });
    setTodo({ ...todo, data: { ...todo.data, todo_items: newTodoItems } });
    await fetch(`https://todo.api.devcode.gethired.id/todo-items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_active: selectedTodoItem.is_active,
      }),
    });
  }

  function handleEditTitle() {
    setIsTitleEdited(true);
    setTimeout(() => {
      titleInput?.current?.focus();
    }, 100);
  }

  async function updateTitle() {
    setIsTitleEdited(false);
    await fetch(
      `https://todo.api.devcode.gethired.id/activity-groups/${todoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      }
    );
  }

  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 -ml-2 sm:-ml-3">
            <Link to="/">
              <div data-cy="todo-back-button">
                <ChevronLeftIcon className="h-6 w-6 sm:h-12 sm:w-12 text-secondary-1" />
              </div>
            </Link>
            <div className="flex gap-4 items-center">
              {!isTitleEdited && (
                <h1
                  data-cy="todo-title"
                  className="text-base sm:text-4xl font-bold leading-6 sm:leading-[54px] text-[#111111]"
                  onClick={handleEditTitle}
                >
                  {title}
                </h1>
              )}
              {isTitleEdited && (
                <input
                  type="text"
                  onBlur={updateTitle}
                  ref={titleInput}
                  className="focus:ring-0 p-0 focus:border-b focus:border-secondary-1 border-0 text-base sm:text-4xl font-bold leading-6 sm:leading-[54px] text-[#111111] bg-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              )}
              <button
                type="button"
                onClick={handleEditTitle}
                data-cy="todo-title-edit-button"
              >
                <PencilIcon className="text-secondary-3 h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <Menu as="div" className="relative inline-block text-left">
              <div data-cy="todo-sort-button">
                <Menu.Button className="flex text-secondary-3 items-center rounded-full border px-1.5 py-2.5 sm:px-4 sm:py-5">
                  <ArrowNarrowUpIcon className="h-4 w-4 -mr-2" />
                  <ArrowNarrowDownIcon className="h-4 w-4" />
                </Menu.Button>
              </div>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div data-cy="sort-parent">
                  <Menu.Items className="z-10 absolute right-0 w-[187px] sm:w-[235px] mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {sortMenus.map((sortMenu, idx) => (
                      <div key={idx}>
                        <Menu.Item>
                          <button
                            data-cy="sort-selection"
                            className="flex w-full justify-between items-center py-[12px] px-[16px] sm:py-[14px] sm:px-[21px]"
                            onClick={() => setActiveSort(idx + 1)}
                          >
                            <div className="flex">
                              <div data-cy="sort-selection-icon"></div>
                              <div data-cy="sort-selection-title">
                                {sortMenu}
                              </div>
                            </div>
                            {activeSort === idx + 1 && (
                              <div data-cy="sort-selection-selected">
                                <CheckIcon className="h-4 w-4 text-secondary-1" />
                              </div>
                            )}
                          </button>
                        </Menu.Item>
                      </div>
                    ))}
                  </Menu.Items>
                </div>
              </Transition>
            </Menu>
            <ButtonIcon
              data-cy="todo-add-button"
              variant="primary"
              onClick={() =>
                setItemModal({
                  ...itemModal,
                  isOpen: true,
                  type: TypeActionState.CREATE,
                  todoItem: todoItem,
                })
              }
              isLoading={false}
              isDisabled={false}
              icon={
                <PlusSmIcon className="font-semibold h-5 w-5 sm:h-8 sm:w-8" />
              }
            >
              Tambah
            </ButtonIcon>
          </div>
        </div>
        {todo.status === StateStatus.RESOLVED && (
          <div className="flex flex-col gap-2.5 mt-7 md:mt-12">
            {todo.data.todo_items.map((item: ITodoItem) => (
              <div
                key={item.id}
                data-cy="todo-item"
                className={clsx(
                  "bg-white border-0 shadow-[0_6px_10px_0_rgba(0,0,0,0.1)] rounded-xl",
                  "px-5 py-[18px] md:px-7 md:py-[26px] "
                )}
              >
                <div className="flex justify-between items-center w-full ">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <input
                      type="checkbox"
                      className="w-3 h-3 sm:w-5 sm:h-5 focus:ring-white text-primary border-secondary-4"
                      onChange={() => ChangeItemStatus(item.id)}
                      value={`${item.is_active}`}
                      checked={!item.is_active}
                      data-cy="todo-item-checkbox"
                    />
                    <div
                      className={clsx(
                        "h-2 w-2 sm:h-3 sm:w-3 rounded-full",
                        PRIORITY_ITEM[item.priority].color
                      )}
                      data-cy="todo-item-priority-indicator"
                    ></div>
                    <h1
                      className={clsx(
                        "text-sm sm:text-lg  leading-[21px] sm:leading-[27px]",
                        item.is_active
                          ? "text-secondary-1"
                          : "text-secondary-4 line-through"
                      )}
                      data-cy="todo-item-title"
                    >
                      {item.title}
                    </h1>
                    <button
                      data-cy="todo-item-edit-button"
                      onClick={() =>
                        setItemModal({
                          ...itemModal,
                          isOpen: true,
                          type: TypeActionState.UPDATE,
                          todoItem: item,
                        })
                      }
                    >
                      <PencilIcon className="h-3 w-3 sm:h-5 sm:w-5 text-secondary-4" />
                    </button>
                  </div>
                  <button
                    data-cy="todo-item-delete-button"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteModal({
                        ...deleteModal,
                        isOpen: true,
                        dataId: item.id,
                        item: item.title,
                      });
                    }}
                  >
                    <TrashIcon className="h-4 w-4 sm:h-6 sm:w-6 text-secondary-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {todo.data.todo_items.length === 0 &&
          todo.status === StateStatus.RESOLVED && (
            <div
              className="mt-[147px] sm:mt-[65px] flex justify-center"
              data-cy="todo-empty-state"
            >
              <div className="lg:relative">
                <img
                  src={TodoEmptyState}
                  alt="empty-state"
                  className="w-full max-w-[541px] items-center"
                />
                <h1
                  className={clsx(
                    "text-center font-semibold mt-[35px] lg:mt-0 right-[70px] top-[260px] text-secondary-2",
                    "text-base lg:text-2xl leading-6 lg:leading-9 lg:absolute"
                  )}
                >
                  Buat List Item Kamu
                </h1>
              </div>
            </div>
          )}
        {todo.status === StateStatus.PENDING && (
          <div className="flex flex-col h-[35rem] items-center justify-center">
            <Spinner size="h-8 w-8" color="text-primary" />
          </div>
        )}
      </div>
      {deleteModal.isOpen && (
        <DeleteModal
          feature="item"
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          onDelete={deleteItem}
          isLoading={
            actionTodo.status === StateStatus.PENDING &&
            actionTodo.type === TypeActionState.DELETE
          }
        />
      )}
      {itemModal.isOpen && (
        <ItemModal
          itemModal={itemModal}
          setItemModal={setItemModal}
          createItem={createItem}
          updateItem={updateItem}
          isLoading={
            actionTodo.status === StateStatus.PENDING &&
            (actionTodo.type === TypeActionState.CREATE ||
              actionTodo.type === TypeActionState.UPDATE)
          }
        />
      )}
    </Container>
  );
}

export default Todo;
