import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const TodoInput = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", //set to {todo (default), On going, Completed}
    createdAt:""
  });
  // console.log(task);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Early return
    if (task.name.length < 3)
      return toast.error("Todo item must be more than 3 characters");

    if (task.name.length > 50)
      return toast.error("Todo item must not be more than 50 characters");

    setTasks((prev) => {
      const list = [...prev, task];

      //serialising - Object to string
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Todo added successfully")
    setTask({
      id: "",
      name: "",
      status: "todo",
      createdAt:""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex gap-2" style={{minWidth:'330px'}}> 
        <input
          type="text"
          className="border border-2 border-info rounded p-2 flex-grow-1"
          value={task.name}
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), name: e.target.value, createdAt:new Date().toISOString()})
          }
          placeholder="Enter a task here"
        />
        <button className="btn btn-info p-2 text-light fw-medium">Add Todo</button>
      </div>
    </form>
  );
};

export default TodoInput;
