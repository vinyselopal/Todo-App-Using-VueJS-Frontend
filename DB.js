async function getAllTodos() {
  const result = await (await fetch("http://localhost:8080", {
    method: "GET"
  })).json();
  return result
}
async function insertTodo(todo) {
  const result = await (await fetch("http://localhost:8080", {
    method: "POST",
    body: JSON.stringify(todo),
    headers:{
      'content-type': 'application/json'
    }
  })).json();
  return result.id
}
async function updateTodo(update, id) {
  const result = await (await fetch(`http://localhost:8080/${id}`, {
    method: "PUT",
    body: JSON.stringify(update),
    headers:{
      'content-type': 'application/json'
    }
  })).json();
  return result
}
async function deleteTodo(id) {
  const result = await (await fetch(`http://localhost:8080/${id}`, {
    method: "DELETE"
  })).json();
  return result
}
async function deleteAll() {
  const result = await (await fetch(`http://localhost:8080/`, {
    method: "DELETE"
  })).json();
  return result
}
async function deleteDone(filter) {
  const result = await (await fetch("http://localhost:8080/done", {
    method: "DELETE",
    body: JSON.stringify(filter),
    headers:{
      'content-type': 'application/json'
    }
  })).json();
  return result.id
}

export const getAllTodosExport = getAllTodos
export const insertTodoExport = insertTodo
export const updateTodoExport = updateTodo
export const deleteTodoExport = deleteTodo
export const deleteAllExport = deleteAll
export const deleteDoneExport = deleteDone




//   insertTodo,
//   updateTodo,
//   deleteTodo,
//   deleteAll,
//   deleteDone,

