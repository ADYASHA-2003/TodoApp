import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoLists from "./components/TodoLists";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from "react-hot-toast";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
// import TodoSearchBar from "./components/TodoSearchBar";

function App() {
  const [tasks, setTasks] = useState([]);

  // console.log("Tasks:", tasks);

  useEffect(() => {
    //deserialising - get original Object format from String stored type
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster/>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5 pt-5 todo-app-container">
        <TodoInput tasks={tasks} setTasks={setTasks} />
        <TodoLists tasks={tasks} setTasks={setTasks}/>
      </div>
    </DndProvider>
  );
}

export default App;
