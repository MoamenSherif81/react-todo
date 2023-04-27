import Todo from "./todo";


function TodosList(props){

  const onHoldTodos = [], completedTodos = [];

  props.todos.forEach((ele) => {
    const todo = (
      <Todo 
        key={ele.id} 
        {...ele}
        setCurrentEditing={props.setCurrentEditing}
        currentEditing={props.currentEditing}
        setEditing={props.setEditing}
        editing={props.editing}
        getTasksData={props.getTasksData}
      />
    )
    if(ele.state === 'completed' || ele.state === 'cancled') completedTodos.push(todo);
    else onHoldTodos.push(todo);
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