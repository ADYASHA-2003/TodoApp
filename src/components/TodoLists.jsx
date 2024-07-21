import React, { useEffect, useState } from "react";
import TodoSectionHeader from "./TodoSectionHeader";
import TodoItem from "./TodoItem";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import TodoSearchBar from "./TodoSearchBar";
import '../index.css'

const TodoLists = ({ tasks, setTasks}) => {
  const [todos, setTodos] = useState([]);
  const [onGoing, setOnGoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [searchTodo, setSearchTodo] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  //Initial and new task rendering
  useEffect(() => {
    const filteredTodos = tasks.filter((task) => task.status === "todo");
    const filteredOnGoing = tasks.filter((task) => task.status === "ongoing");
    const filteredCompleted = tasks.filter(
      (task) => task.status === "completed"
    );

    setTodos(filteredTodos);
    setOnGoing(filteredOnGoing);
    setCompleted(filteredCompleted);
    setFilteredTasks(tasks)
  }, [tasks]);

  useEffect(() => {
    if (searchTodo.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTodo.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchTodo, tasks]);

  const statuses = ["todo", "ongoing", "completed"];

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center pt-5">
      {/* {tasks.length > 0 && (  */}
        <div className="mb-3 mx-4" style={{alignSelf:'flex-start'}}>
          <TodoSearchBar searchTodo={searchTodo} setSearchTodo={setSearchTodo}/>
        </div>
      {/* )} */}
      <div className="container">
        <div className="row">
          {statuses.map((status, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <TodoListSection
                status={status}
                tasks={tasks}
                setTasks={setTasks}
                filteredTasks={filteredTasks}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoLists;

//Section header and list of todos
const TodoListSection = ({status,tasks,setTasks, filteredTasks}) => {

  const [{isOver},drop] = useDrop(()=>({
    accept:"task",
    drop:(item)=> addItemToSection(item.id),
    collect:(monitor)=>({
        isOver: !!monitor.isOver()
    })
  }))

  let text="TO-DO"
  let background = "bg-danger bg-gradient"
  // let tasksToMap = todos
  let subtleColorClass = "bg-danger-subtle";

  if(status === 'ongoing'){
    text = 'ON GOING'
    background = "bg-warning bg-gradient"
    // tasksToMap = onGoing
    subtleColorClass = "bg-warning-subtle";
  }
  
  if(status === 'completed'){
    text = 'COMPLETED'
    background = "bg-success bg-gradient"
    // tasksToMap = completed
    subtleColorClass = "bg-success-subtle";
  }

  const addItemToSection = (id) =>{
    console.log("Dropped item at:",id,status);
    setTasks(prev=>{
      const modifiedTask = prev.map(t=>{
        if(t.id===id){
          return {...t, status:status, completedAt: status === 'completed' ? new Date().toISOString() : null}
        }
        return t
      })

      localStorage.setItem('tasks',JSON.stringify(modifiedTask))
      toast("Todo item status changed",{icon:'⌛'})
      return modifiedTask
    })
  }

  const tasksToMap = filteredTasks.filter((task) => task.status === status);

  return (
  <div ref={drop} style={{ width: "350px" }} className={`rounded p-2 ${isOver?subtleColorClass:""}`}>
    {/* <h5>{status}</h5> */}
    <TodoSectionHeader text={text} background={background} count={tasksToMap.length}/>
    <div style={{ maxHeight: '500px', overflowY: 'auto',scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
    {tasksToMap.length >0 && tasksToMap.map(task => <TodoItem key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>)}
    </div>
  </div>
  )
};
