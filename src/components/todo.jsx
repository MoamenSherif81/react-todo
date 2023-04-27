import editIcon from '../images/edit.svg'
import deleteIcon from '../images/delete.svg'

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

  return (
    <div className="todo">
      <p className="todo-title">{props.taskTitle}</p>
      <div className="status" style={statuesStyles}>
        {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
      </div>
      <div className={"priority priority--" + (props.priority === 'minor' ? 'green' : props.priority === 'normal' ? 'yellow' : 'red')}>
        {props.priority.charAt(0).toUpperCase() + props.priority.slice(1)}
      </div>
      <div className="edit-btns">
        <div className="todo-edit">
          <img src={editIcon} alt="" />
        </div>
        <div className="todo-delete">
          <img src={deleteIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Todo;