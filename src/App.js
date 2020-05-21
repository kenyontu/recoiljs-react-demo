import React from 'react'

import styles from './App.module.css'
import TodoList from './components/TodoList'
import AppBar from './components/AppBar'
import FilterBar from './components/FilterBar'

function App() {
  return (
    <div className={styles.container}>
      <AppBar />
      <div className={styles.content}>
        <TodoList />
      </div>
      <FilterBar />
    </div>
  )
}

export default App
