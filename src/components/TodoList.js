import React, { useEffect } from 'react'

import {
  useTodos,
  useFetchTodos,
  useDeleteTodo,
  useUpdateTodo,
} from '../state/todos'
import styles from './TodoList.module.css'

const TodoItem = React.memo(({ todo }) => {
  const deleteTodo = useDeleteTodo()
  const updateTodo = useUpdateTodo()

  const handleCheckChange = (event) => {
    updateTodo({ ...todo, isDone: event.target.checked }, false)
  }

  const handleDescriptionChange = (event) => {
    updateTodo({ ...todo, description: event.target.value }, false)
  }

  const handleDeleteClick = () => {
    deleteTodo(todo.id)
  }

  return (
    <div className={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={handleCheckChange}
      />
      <input
        className={styles.description}
        value={todo.description}
        onChange={handleDescriptionChange}
      />
      <span className={styles.deleteBtn} onClick={handleDeleteClick}></span>
    </div>
  )
})

const TodoList = () => {
  const { todos, isFetchingTodos } = useTodos()
  const fetchTodos = useFetchTodos()

  useEffect(() => fetchTodos(), [fetchTodos])

  return (
    <>
      {isFetchingTodos ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.todoList}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  )
}

export default TodoList
