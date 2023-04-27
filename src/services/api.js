const API_URL = 'http://localhost:3001/tasks/';

export const getAllTodos = async () =>{
  const res = await fetch(API_URL);
  const data = await res.json();
  return await data;
}

export const getSingleTodo = async (id) =>{
  const res = await fetch(API_URL + id);
  const data = await res.json();
  return await data;
}

export const addNewTodo = async (todo) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo)
  })
}

export const editTodoAPI = async (todo, id) => {
  await fetch(API_URL + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo)
  })
}