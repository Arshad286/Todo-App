import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoCard from "../../components/Cards/todo-card";

const Home = () => {
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
    </>
  );
};

export default Home;
