import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import TodosList from "./components/TodosList";

function App() {
  const [onHoldTodos, setOnHoldTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(res => res.json())
      .then(data => {
        const tasks = [];
        const completedTasks = [];
        data.forEach(ele => {
          if(ele.state === 'completed') completedTasks.push(ele);
          else tasks.push(ele);
        });
        setOnHoldTodos(tasks);
        setCompletedTodos(completedTasks)
      });
  }, [])
  
  return (
    <div className="App">
      <Header todosCnt={onHoldTodos.length} />
      <TodosList onHoldTodos={onHoldTodos} completedTodos={completedTodos} />
    </div>
  );
}

export default App;
