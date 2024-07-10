import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoCard from "../../components/Cards/todo-card";
import { MdAdd } from "react-icons/md";
import moment from "moment";
import AddNotes from "./add-notes";
import Modal from "react-modal";
import FilterTodo from "../../components/Filter/filter-todo";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios-instance";
import Toast from "../../components/ToastMessage/toast-message";
import EmptyCard from "../../components/EmptyCard/empty-card";
import AddNoteImg from "../../assets/images/add.png";
import NoDataImg from "../../assets/images/no-data.png";

const Home = () => {
  const [openAddModal, setOpenAddModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [addTodos, setAddTodos] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setisSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (todoDetails) => {
    setOpenAddModel({ isShown: true, type: "edit", data: todoDetails });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "" });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get all Todos
  const getAllTodo = async () => {
    try {
      const response = await axiosInstance.get("/todos/todos");

      if (response.data && response.data.todos) {
        setAddTodos(response.data.todos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  //Delete Todos
  const DeletTodo = async (t) => {
    const todoId = data._id;

    try {
      const response = await axiosInstance.delete("/todos/todos/" + todoId);

      if (response.data && !response.data.error) {
        showToastMessage("Todo Delete Successfully", "delete");
        getAllTodo();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occured, Please try again");
      }
    }
  };

  //Search Todos
  const onSearchTodo = async (query) => {
    try {
      const response = await axiosInstance.get("/todos/todos/search", {
        params: { query },
      });

      if (response.data && response.data.todos) {
        setisSearch(true);
        setAddTodos(response.data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Mark Complete Todo
  const updateIsComplete = async (todoData) => {
    const todoId = todoData._id;

    try {
      const response = await axiosInstance.patch(
        `/todos/todos/${todoId}/status`,
        {
          Completed: !todoData.Completed,
        }
      );

      if (response.data && !response.data.error) {
        showToastMessage("Todo status updated successfully");
        getAllTodo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Pin Todo
  const updateIsPinned = async (todoData) => {
    const todoId = todoData._id;

    try {
      const response = await axiosInstance.patch(`/todos/todos/${todoId}`, {
        isPinned: !todoData.isPinned,
      });
      if (response.data && !response.data.error) {
        showToastMessage("Todo Pinned Successfully");
        getAllTodo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setisSearch(false);
    getAllTodo();
  };

  useEffect(() => {
    getAllTodo();
    getUserInfo();
  }, []);

  const [filter, setFilter] = useState({ status: "all", overdue: "all" });

  const filterTodos = (todos) => {
    const today = new Date();

    return todos.filter((todo) => {
      const todoDate = new Date(todo.dueDate);

      const isOverdue = todoDate < today;
      const matchesStatus =
        filter.status === "all" ||
        (filter.status === "to-do" && !todo.Completed) ||
        (filter.status === "done" && todo.Completed);
      const matchesOverdue =
        filter.overdue === "all" || (filter.overdue === "overdue" && isOverdue);
      return matchesStatus && matchesOverdue;
    });
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchTodo={onSearchTodo}
        handleClearSearch={handleClearSearch}
      />
      <div className="conatiner mx-auto">
        {addTodos.length > 0 ? (
          <>
            <FilterTodo filter={filter} setFilter={setFilter} />
            <div className="p-4 grid grid-cols-3 gap-8 mt-8 ">
              {filterTodos(addTodos).map((todo, index) => (
                <TodoCard
                  key={todo._id}
                  title={todo.title}
                  date={moment(todo.dueDate).format("Do MMM YYYY")}
                  description={todo.description}
                  tags={todo.type}
                  isActive={todo.Completed}
                  isPinned={todo.isPinned}
                  onEdit={() => handleEdit(todo)}
                  onDelete={() => DeletTodo(todo)}
                  onPinTodo={() => updateIsPinned(todo)}
                  onCompleted={() => updateIsComplete(todo)}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNoteImg}
            message={
              isSearch
                ? `Oops! No Todos found matching your search.`
                : `Start creating your first Todo! Click the 'Add' button 
            Let's get started!
            `
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 "
        onClick={() => {
          setOpenAddModel({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px]  text-white" />
      </button>

      <Modal
        isOpen={openAddModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddNotes
          tag={openAddModal.type}
          todoData={openAddModal.data}
          onClose={() => {
            setOpenAddModel({ isShown: false, type: "add", data: null });
          }}
          getAllTodo={getAllTodo}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
