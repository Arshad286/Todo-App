import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoCard from "../../components/Cards/todo-card";
import { MdAdd } from "react-icons/md";
import AddNotes from "./add-notes";
import Modal from "react-modal";
import FilterTodo from "../../components/Filter/filter-todo";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios-instance";

const Home = () => {

  const [openAddModal , setOpenAddModel] = useState({
    isShown : false,
    type : "add",
    data : null,
  });

  const todos = [
    // Example TODO items
    {
      title: "Demo",
      date: "2023-07-5",
      description: "Completing this app",
      tags: "#meeting",
      isActive: true,
      isPinned: true,
    },
    {
      title: "Demo1",
      date: "2024-07-05",
      description: "Completing this app",
      tags: "#meeting",
      isActive: false,
      isPinned: false,
    },
    // Add more TODO items here
  ];

    const [userInfo, setUserInfo] = useState(null);

     const navigate = useNavigate();

   // Get User Info
     const getUserInfo = async () => {
       try{
      const response = await axiosInstance.get("/users/get-user");

       if(response.data && response.data.user){
            setUserInfo(response.data.user);
     }
     }catch(error){

      if(error.response.status === 401){
       localStorage.clear();
         navigate("/login");
       }
    }
   };

  useEffect(() => {
    getUserInfo();
  },[])

 

  const [filter, setFilter] = useState({ status: "all", overdue: "all" });

  const filterTodos = (todos) => {
    const today = new Date();
    return todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      const isOverdue = todoDate < today
      const matchesStatus =
        filter.status === "all" ||
        (filter.status === "to-do" && todo.isActive) ||
        (filter.status === "done" && !todo.isActive);
      const matchesOverdue =
        filter.overdue === "all" || (filter.overdue === "overdue" && isOverdue);
      return matchesStatus && matchesOverdue;
    });
  };

  return (
    <>
      <Navbar  userInfo = {userInfo} />

      <FilterTodo filter={filter} setFilter={setFilter} />
        <div className="grid grid-cols-3 gap-4 mt-8">
          {filterTodos(todos).map((todo, index) => (
            <TodoCard
              key={index}
              title={todo.title}
              date={todo.date}
              description={todo.description}
              tags={todo.tags}
              isActive={todo.isActive}
              isPinned={todo.isPinned}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 "
       onClick={() => {
        setOpenAddModel({ isShown : true, type : "add", data : null});
       }}
       >
       <MdAdd className="text-[32px]  text-white"/>
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
      onClose={() => {
        setOpenAddModel( {isShown: false, type : "add" , data : null});
      }}
      />

      </Modal>
    </>
  );
};

export default Home;
