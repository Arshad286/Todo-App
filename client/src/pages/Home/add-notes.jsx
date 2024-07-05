import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const AddNotes = ({onClose}) => {
 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Official");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);

    const handleAddNote = () => {
        // Handle the logic for adding a note

        if(!title && !description && !dueDate){
          setError("Please enter the all fields");
          return;
        }
        
        console.log({
          title,
          description,
          type,
          dueDate,
        });

        setError("");
      };


  return (
    <div className="relative">

      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 "
       onClick={onClose}>

        <MdClose className="text-xl text-slate-400"/>
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2l text-slate-950 outline-none"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DESCRIPTION</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 roundede"
          placeholder="Description"
         onChange={(e) => setDescription(e.target.value)}
          rows={10}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">TYPE</label>
        <select
          className=" text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Official">Official</option>
          <option value="Personal">Personal</option>
          <option value="Hobby">Hobby</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DUE DATE</label>
        <input
          type="date"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

      <button className="btn-primary fond-medium mt-5 p-3" onClick={handleAddNote}>
        ADD
      </button>
    </div>
  );
};

export default AddNotes;
