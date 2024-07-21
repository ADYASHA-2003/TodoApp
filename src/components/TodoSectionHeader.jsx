import React from 'react'

const TodoSectionHeader = ({text, background, count}) => {
  return (
    <div className={`${background} d-flex px-5 py-3 rounded justify-content-center`}>
      <div className='text-light fw-bolder'>{text}</div> <div className='border border-light mx-2 px-1 fw-medium' style={{borderRadius:'50%',width:20,height:20,backgroundColor:'white',alignSelf:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>{count}</div>
    </div>
  )
}

export default TodoSectionHeader
