export const fetchTodos = () => {
  return fetch('http://localhost:3001/todos').then((res) => res.json())
}

export const createTodo = (todo) => {
  return fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json())
}

export const updateTodo = (todo) => {
  console.log('updating')
  return fetch(`http://localhost:3001/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json())
}

export const deleteTodo = (todoId) => {
  return fetch(`http://localhost:3001/todos/${todoId}`, {
    method: 'DELETE',
  })
}
