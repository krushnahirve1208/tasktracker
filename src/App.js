import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState,useEffect } from 'react';
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask,setShowAddTask]=useState(true);
  const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    const getTasks=async ()=>{
      const taskFromServer=await fetchTasks();
      setTasks(taskFromServer);
}
    getTasks();
  },[])
  const fetchTasks=async ()=>{
    const res=await fetch("http://localhost:5000/tasks");
    const data=await res.json();
    return data;
  }
  const fetchTask=async (id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`);
    const data=await res.json();
    return data;
  }
  const addTask=async (task)=>{
  // const id=Math.floor(Math.random()*10000);
  // const newtask={...task,id};
  // setTasks([...tasks,newtask])
  const res=await fetch(`http://localhost:5000/tasks/`,{
       method:'POST',
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify(task),
  })
  const data=await res.json();
  setTasks([...tasks,data]);

}
const deleteTask=async (id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE',
  });
  setTasks(tasks.filter((task)=>task.id!==id))
}
const toggleReminder=async(id)=>{
   const taskToToggle=await fetchTask(id);
   const updTask={...taskToToggle,reminder:!taskToToggle.reminder};
   const res=await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(updTask),
   },)
   const data=await res.json();
   setTasks(tasks.map((task)=>task.id===id?{...task,reminder:data.reminder}:task) )
}
  return (
    <div className="container">
      <Header showAdd={showAddTask} onAdd={()=>setShowAddTask(!showAddTask)}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:"Enjoy Free Weekend"}
    </div>
    
  );
}

export default App;
