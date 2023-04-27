import Todo from "./todo";


function TodosList(props){

  const onHoldTodos = props.onHoldTodos.map(ele => {
    return (
      <Todo 
        key={ele.id} 
        id={ele.id}
        taskTitle={ele.title}
        setCurrentEditing={props.setCurrentEditing}
        status={ele.state} 
        priority={ele.priority} 
        setEditing={props.setEditing}
        editing={props.editing}
        currentEditing={props.currentEditing}
        getTasksData={props.getTasksData}
      />)
  })
  const completedTodos = props.completedTodos.map(ele => {
    return (
      <Todo 
        key={ele.id} 
        id={ele.id}
        taskTitle={ele.title}
        setCurrentEditing={props.setCurrentEditing}
        status={ele.state} 
        priority={ele.priority} 
        setEditing={props.setEditing}
        editing={props.editing}
        currentEditing={props.currentEditing}
      />)
  })
  
  return (
    <>
      <div className="todos-section">
        <h2 className="todos-section-title">On Hold</h2>
        <div className="todos">
          {onHoldTodos.length === 0 ? <div className="todo">No todos for now</div> : ''}
          {onHoldTodos}
        </div>
      </div>
      <div className="todos-section">
        <h2 className="todos-section-title">Completed</h2>
        <div className="todos completed-todos">
        {completedTodos.length === 0 ? <div className="todo">Nothing completed till now</div> : ''}
          {completedTodos}
        </div>
      </div>
    </>
  );
}

export default TodosList;