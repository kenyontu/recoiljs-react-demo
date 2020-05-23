import React from 'react'

import styles from './App.module.css'
import TodoList from './components/TodoList'
import AppBar from './components/AppBar'
import FilterBar from './components/FilterBar'
import CreateTodoBar from './components/CreateTodoBar'

function App() {
  return (
    <div className={styles.container}>
      <AppBar />
      <FilterBar />
      <div className={styles.content}>
        <TodoList />
      </div>
      <CreateTodoBar />
    </div>
  )
}

export default App
