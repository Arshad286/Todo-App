import React from "react";
import {
  MdOutlinePushPin,
  MdDoneOutline,
  MdCreate,
  MdDelete,
} from "react-icons/md";

const TodoCard = ({
  title,
  date,
  description,
  tags,
  isPinned,
  isActive,
  onEdit,
  onDelete,
  onPinTodo,
  onCompleted,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out ">
      <div className="flex items-center justify-between ">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <div className="flex gap-2">
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-300"
            }`}
            onClick={onPinTodo}
          />
          <MdDoneOutline
            className={`icon-btn ${
              isActive ? "text-secondary" : "text-slate-500"
            }`}
            onClick={onCompleted}
          />
        </div>
      </div>
      <p className="text-xs text-slate-600 mt-2">{description?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags}</div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
