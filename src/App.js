import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import TodosList from "./components/TodosList";
import AddTask from "./components/AddTask";
import {getAllTodos} from './services/api'



function App() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [currentEditing, setCurrentEditing] = useState();

  async function getTasksData(){
    setTodos(await getAllTodos());
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
      <Header 
        todosCnt={todos.filter((ele) => {
          return ele.state !== 'completed' && ele.state !== 'cancled'}
          ).length}
        toggleAdding={toggleAdding} 
        editing={editing} 
        adding={adding} 
        cancelEditing={cancelEditing} 
      />
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
        todos={todos}
        editing={editing}
        getTasksData={getTasksData}
      />
    </div>
  );
}

export default App;
