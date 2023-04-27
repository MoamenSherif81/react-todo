import { useEffect, useState } from "react";

function AddTask(props){
  const [formData, setFormData] = useState({
    title: '',
    priority: 'minor',
    state: 'pending'
  });
  const [editing, setEditing] = useState(false);

  function getTodoData(){
    fetch('http://localhost:3001/tasks/' + props.currentEditing)
        .then(res => res.json())
        .then(data => setFormData(data))
  }
  
  useEffect(() => {
    if(props.currentEditing !== undefined && props.currentEditing !== null){
      getTodoData();
      setEditing(true)
    }
  }, [props.currentEditing])
  
  function addTodo(e){
    e.preventDefault();
    const postData = async () => {
      await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      props.getTasksData();
    }
    props.toggleAdding();
    postData();
  }

  function editTodo(e){
    e.preventDefault();
    const postData = async () => {
      await fetch('http://localhost:3001/tasks/' + props.currentEditing, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      props.getTasksData();
    }
    props.toggleEditing();
    postData();
  }

  function formChange(e){
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  console.log(props.currentEditing);

  return (
    <>
      <form className="add-task-form" onSubmit={editing ? editTodo : addTodo}>
        <div>
          <label htmlFor="title">Todo: </label>
          <input type="text" id='title' name="title" value={formData.title} onChange={formChange} />
        </div>
        <div>
          <label htmlFor="priority">Priority: </label>
          <select name="priority" id="priority" value={formData.priority} onChange={formChange}>
            <option value="minor">Minor</option>
            <option value="normal">Normal</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          {
              editing ? 
              <>
                <label htmlFor="state">state: </label>
                <select name="state" id="state" value={formData.state} onChange={formChange}>
                  <option value="pending">pending</option>
                  <option value="in progess">In progess</option>
                </select>
              </>
            : ''
          }
        </div>
        <button className="add-task">Add</button>
      </form>
    </>
  );
}

export default AddTask;