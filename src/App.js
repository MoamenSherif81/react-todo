import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import TodosList from "./components/TodosList";
import AddTask from "./components/AddTask";



function App() {
  const [onHoldTodos, setOnHoldTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [currentEditing, setCurrentEditing] = useState();

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
    if(adding) toggleAdding();
    setEditing(prev => !prev);
  }
  function toggleAdding(){
    if(editing) toggleEditing();
    setAdding(prev => !prev);
  }

  function cancelEditing(){
    if(editing) toggleEditing();
    else if(adding) toggleAdding();
  }

  return (
    <div className="App">
      <Header todosCnt={onHoldTodos.length} toggleAdding={toggleAdding} editing={editing} adding={adding} cancelEditing={cancelEditing} />
      {adding ? 
        <AddTask toggleAdding={toggleAdding} getTasksData={getTasksData}/>
        : ''
      }
      {editing ? 
        <AddTask 
          currentEditing={currentEditing} 
          toggleAdding={toggleAdding} 
          toggleEditing={toggleEditing} 
          getTasksData={getTasksData}
        />
        : ''
      }
      <TodosList 
        setCurrentEditing={setCurrentEditing} 
        currentEditing={currentEditing}
        setEditing={setEditing} 
        onHoldTodos={onHoldTodos} 
        completedTodos={completedTodos} 
        editing={editing}
        getTasksData={getTasksData}
      />
    </div>
  );
}

export default App;
