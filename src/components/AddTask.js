import React from 'react'
import { useState } from 'react'
const AddTask = ({onAdd}) => {
  const [text,setText]=useState('');
  const [day,setDay]=useState('');
  const [reminder,setReminder]=useState(false);
  const onSubmit=(e)=>{
    e.preventDefault();
    if(!text){
        alert('please, add task');
        return;
    }
    onAdd({text,day,reminder});
    setDay('');
    setText('');
    setReminder(false);
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="task">Task</label>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} name="task" placeholder='add task'/>
      </div>
      <div className="form-control">
        <label htmlFor="date">DAY & Time</label>
        <input type="text" value={day} onChange={(e)=>setDay(e.target.value)} name="date" placeholder='add day and time'/>
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="reminder">Set Reminder</label>
        <input type="checkbox" checked={reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)} name="reminder" placeholder='add task'/>
      </div>
      <input className="btn btn-block" type="submit" value="Save" />
    </form>
  )
}

export default AddTask