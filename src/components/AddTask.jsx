import { useEffect, useState } from "react";
import { addNewTodo, editTodoAPI, getSingleTodo } from "../services/api";

function AddTask(props) {
  const [formData, setFormData] = useState({
    title: "",
    priority: "minor",
    state: "pending",
  });
  const [editing, setEditing] = useState(false);

  async function getTodoData() {
    setFormData(await getSingleTodo(props.currentEditing));
  }

  useEffect(() => {
    if (props.currentEditing !== undefined && props.currentEditing !== null) {
      getTodoData();
      setEditing(true);
    }
  }, [props.currentEditing]);

  async function addTodo(e) {
    e.preventDefault();
    await addNewTodo(formData);
    props.getTasksData();
    props.toggleAdding();
  }

  async function editTodo(e) {
    e.preventDefault();
    await editTodoAPI(formData, props.currentEditing);
    props.getTasksData();
    props.toggleEditing();
  }

  function formChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  return (
    <form className="add-task-form" onSubmit={editing ? editTodo : addTodo}>
      <div>
        <label htmlFor="title">Todo: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={formChange}
        />
      </div>
      <div>
        <label htmlFor="priority">Priority: </label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={formChange}
        >
          <option value="minor">Minor</option>
          <option value="normal">Normal</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div>
        {editing && (
          <>
            <label htmlFor="state">state: </label>
            <select
              name="state"
              id="state"
              value={formData.state}
              onChange={formChange}
            >
              <option value="pending">pending</option>
              <option value="in progess">In progress</option>
            </select>
          </>
        )}
      </div>
      <button className="add-task">Add</button>
    </form>
  );
}

export default AddTask;
