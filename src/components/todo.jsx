import editIcon from '../images/edit.svg'
import deleteIcon from '../images/delete.svg'
import moreIcon from '../images/more.svg'
import correctIcon from '../images/correct.svg'

function Todo(props){

  let statusColor;
  switch(props.status){
    case 'pending':
      statusColor = '#F2994A';
      break;
    case 'completed':
      statusColor = '#27AE60';
      break;
    case 'cancled':
      statusColor = '#EB5757';
      break;
    default:
      statusColor = '#56CCF2';
  }

  const statuesStyles ={
    backgroundColor: statusColor + '33',
    color: statusColor
  }

  function handleEdit(){
    if(props.currentEditing === props.id && props.editing){
      props.setEditing(false);
    } else if(props.editing){
      props.setCurrentEditing(props.id)
    } else {
      props.setCurrentEditing(props.id)
      props.setEditing(true)
    }
  }

  function editStatue(state){
    const editData = async () => {
      await fetch('http://localhost:3001/tasks/' + props.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: state
        })
      })
      props.getTasksData();
    }
    editData();
  }

  return (
    <div className="todo">
      <p className="todo-title">{props.taskTitle}</p>
      <div className="status" style={statuesStyles}>
        {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
      </div>
      <div className={"priority priority--" + (props.priority === 'minor' ? 'green' : props.priority === 'normal' ? 'yellow' : 'red')}>
        {props.priority.charAt(0).toUpperCase() + props.priority.slice(1)}
      </div>
      <div className="todo-options">
        <div className="options-icon">
          <img src={moreIcon} alt="" />
        </div>
        <div className="edit-btns">
          <div className="todo-edit options-btn" onClick={handleEdit}>
            <img src={editIcon} alt="" />
          </div>
          <div className="todo-delete options-btn" onClick={() => editStatue('cancled')}>
            <img src={deleteIcon} alt="" />
          </div>
          <div className="todo-completed options-btn" onClick={() => editStatue('completed')}>
            <img src={correctIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;