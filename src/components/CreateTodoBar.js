import React, { useState } from 'react'

import styles from './CreateTodoBar.module.css'
import { useCreateTodo } from '../state/todos'

const CreateTodoBar = () => {
  const createTodo = useCreateTodo()
  const [description, setDescription] = useState('')

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleCreateClick = () => {
    createTodo(description).then(() => {
      setDescription('')
    })
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.description}
        placeholder="New to-do"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button className={styles.createBtn} onClick={handleCreateClick}>
        Create
      </button>
    </div>
  )
}

export default CreateTodoBar
