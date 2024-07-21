import React from 'react'
import { FaSearch } from "react-icons/fa";

const TodoSearchBar = ({searchTodo, setSearchTodo, handleSearch}) => {
  return (
    <>
    <div className='mb-3 d-flex' style={{position:'relative'}}>
      <input type="text" className='form-control border border-info' placeholder='Search tasks ...' value={searchTodo} onChange={(e)=> setSearchTodo(e.target.value)}/>
      <button className='btn' onClick={handleSearch} style={{position:'absolute',cursor:'pointer',right:0}}><FaSearch className='text-info align-self-center' /></button>
    </div>
    </>
  )
}

export default TodoSearchBar
