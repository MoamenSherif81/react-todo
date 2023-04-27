import { useState } from "react";

function AddTask(props){
  const [formData, setFormData] = useState({
    title: '',
    priority: 'minor',
    state: 'pending'
  });
  
  function addTask(e){
    e.preventDefault();
    const postData = async () => {
      await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
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

  return (
    <>
      <form className="add-task-form" onSubmit={addTask}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id='title' name="title" value={formData.title} onChange={formChange} />
        </div>
        <div>
          <label htmlFor="priority">Todo Priority</label>
          <select name="priority" id="priority" value={formData.priority} onChange={formChange}>
            <option value="minor">Minor</option>
            <option value="normal">Normal</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <button>Add</button>
      </form>
    </>
  );
}

export default AddTask;