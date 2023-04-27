import Todo from "./todo";


function TodosList(props){

  const onHoldTodos = props.onHoldTodos.map(ele => {
    return <Todo key={ele.id} taskTitle={ele.title} status={ele.state} priority={ele.priority}/>
  })
  const completedTodos = props.completedTodos.map(ele => {
    return <Todo key={ele.id} taskTitle={ele.title} status={ele.state} priority={ele.priority}/>
  })
  
  return (
    <>
      <div className="todos-section">
        <h2 className="todos-section-title">On Hold</h2>
        <div className="todos">
          {onHoldTodos}
        </div>
      </div>
      <div className="todos-section">
        <h2 className="todos-section-title">Completed</h2>
        <div className="todos completed-todos">
          {completedTodos}
        </div>
      </div>
    </>
  );
}

export default TodosList;