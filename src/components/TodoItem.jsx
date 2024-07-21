import React, { useState } from 'react'
import { useDrag } from 'react-dnd';
import toast from 'react-hot-toast';
import { MdDelete,MdSave,MdEdit } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

const TodoItem = ({task, tasks, setTasks}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState(task.name)

    const [{isDragging},drag] = useDrag(()=>({
        type:"task",
        item:{id:task.id},
        collect:(monitor)=>({
            isDragging: !!monitor.isDragging()
        }),
    }))

    console.log("Dragging:",isDragging);

    const handleRemove=(id)=>{
        // console.log(id);

        //Carries all tasks that do not match with the current item id
        const filteredTasks = tasks.filter(t=>t.id!==id)
        localStorage.setItem("tasks",JSON.stringify(filteredTasks))
        setTasks(filteredTasks)
        toast("Todo Item Removed",{icon:"❗"})
    }

    const handleEdit=()=>{
        if(task.status!=="completed"){
            setIsEditing(true)
        }
    }

    const handleInputChange=(e)=>{
        const value = e.target.value
        if(value.length<=50){
            setEditedTask(value)
        }
    }

    const handleSave=(id)=>{
        const updatedTasks = tasks.map(t=>t.id===id?{...t, name:editedTask, updatedAt: new Date().toISOString()}:t)
        localStorage.setItem("tasks",JSON.stringify(updatedTasks))
        setTasks(updatedTasks)
        setIsEditing(false)
        toast.success("Todo Item Updated")
    }

    const handleStatusChange=(id)=>{
        const updatedTasks = tasks.map(t=> t.id === id?{...t, status: t.status==='completed'?'todo':'completed', completedAt: t.status === 'completed' ? null : new Date().toISOString()}:t)
        localStorage.setItem("tasks",JSON.stringify(updatedTasks))
        setTasks(updatedTasks)
        const statusMessage = updatedTasks.find(t => t.id === id).status === 'completed' 
        ? "Todo Item Status Changed to Completed" 
        : "Todo Item Status Changed to Todo"
        toast.success(statusMessage)
    }

  return (
    <div ref={drag} className="card my-2 shadow mb-4 bg-white rounded mt-4">
    <div className="card-body d-flex justify-content-between">
        <div style={{ flex: 1, overflow: 'hidden',display:'flex'}}>
            <input type='checkbox' className='me-3' checked={task.status === 'completed'} onChange={()=>handleStatusChange(task.id)} style={{alignSelf:'center'}}/>
            {isEditing?(
                <input type='text' value={editedTask} onChange={handleInputChange} className='form-control'/>
            ):(
                <div style={{display:'flex',flexDirection:'column'}}>
                    <h6 className={`card-text fw-medium ${task.status==='completed'?'text-decoration-line-through':''}`}>{task.name}</h6>
                    <p className="text-muted" style={{ fontSize: "0.8rem",marginBottom:0}}>
                       {task.updatedAt
                            ? `Last Edited: ${new Date(task.updatedAt).toLocaleString()}`
                            : `Added: ${new Date(task.createdAt).toLocaleString()}`
                       }
                       {task.status === 'completed' && task.completedAt && (
                            <p className="text-muted" style={{ fontSize: "0.8rem", marginBottom: 0 }}>
                                Completed: {new Date(task.completedAt).toLocaleString()}
                            </p>
                        )}
                    </p>
                </div>
            )}
        </div>

        <div style={{display:'flex'}}>
            {task.status !== 'completed' && (
                <>
                {isEditing ? (
                    <BsCheckCircle size={18} className="align-self-center mx-2" onClick={() => handleSave(task.id)} />
                ) : (
                    <MdEdit size={18} className="align-self-center mx-2" onClick={handleEdit} />
                )}
                </>
            )}
            <MdDelete size={18} className='align-self-center' onClick={()=>handleRemove(task.id)}/>
        </div>
    </div>
  </div>
  )
}

export default TodoItem
