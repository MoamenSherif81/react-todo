import addIcon from '../images/add.png'

function Header(props){
  return (
    <header>
      <div>
        You've got <span className="header--pink">{props.todosCnt} {props.todosCnt > 1 ? 'tasks' : 'task'}</span> today
      </div>
      <button to='addTask' className="add-task" onClick={props.toggleEditing}><img src={addIcon} alt='Add Icon'/>
        {props.editing ? 'Cancel editing' : 'Add task'}
      </button>
    </header>
  );
}

export default Header;