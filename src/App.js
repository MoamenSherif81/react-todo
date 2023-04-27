import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import TodosList from "./components/TodosList";
import AddTask from "./components/AddTask";



function App() {
  const [onHoldTodos, setOnHoldTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editing, setEditing] = useState(false);

  function getTasksData(){
    fetch('http://localhost:3001/tasks')
      .then(res => res.json())
      .then(data => {
        const tasks = [];
        const completedTasks = [];
        data.forEach(ele => {
          if(ele.state === 'completed' || ele.state === 'cancled') completedTasks.push(ele);
          else tasks.push(ele);
        });
        setOnHoldTodos(tasks);
        setCompletedTodos(completedTasks)
      });
  }

  useEffect(() => {
    getTasksData();
  }, [])
  
  function toggleEditing(){
    console.log('Here');
    setEditing(prev => !prev);
  }

  return (
    <div className="App">
      <Header todosCnt={onHoldTodos.length} editing={editing} toggleEditing={toggleEditing} />
      {editing ? 
        <AddTask toggleEditing={toggleEditing} getTasksData={getTasksData}/>
        : ''
      }
      <TodosList onHoldTodos={onHoldTodos} completedTodos={completedTodos} />
    </div>
  );
}

export default App;
