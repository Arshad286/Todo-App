import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoCard from "../../components/Cards/todo-card";
import { MdAdd } from "react-icons/md";
import AddNotes from "./add-notes";
import Modal from "react-modal";


const Home = () => {

  const [openAddModal , setOpenAddModel] = useState({
    isShown : false,
    type : "add",
    data : null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <TodoCard
            title="Demo"
            date="7 july 2024"
            description="Completing this app"
            tags="#meeting"
            isActive={true}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
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
