import React from 'react'
import styles from './AppBar.module.css'

const AppBar = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-dos</h1>
    </div>
  )
}

export default AppBar
