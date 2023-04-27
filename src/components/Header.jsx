import addIcon from '../images/add.png'

function Header({...props}){
  const {editing, adding, todosCnt, cancelEditing, toggleAdding} = {...props};

  function handleAddBtn(){
    if(editing || adding) cancelEditing();
    else toggleAdding();
  }

  return (
    <header>
      <div>
        You've got <span className="header--pink">{todosCnt} {todosCnt > 1 ? 'tasks' : 'task'}</span> today
      </div>
      <button to='addTask' className="add-task" onClick={handleAddBtn}><img src={addIcon} alt='Add Icon'/>
        {editing || adding ? 'Cancel' : 'Add task'}
      </button>
    </header>
  );
}

export default Header;