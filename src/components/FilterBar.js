import React from 'react'
import classNames from 'classnames'

import styles from './FilterBar.module.css'
import { useTodoFilter, todoFilters } from '../state/todos'

const FilterOption = ({ name, active = false, onClick }) => {
  return (
    <div className={styles.filter}>
      <div
        className={classNames(styles.filterIndicator, {
          [styles.active]: active,
        })}
        onClick={onClick}
      >
        <span
          className={classNames(styles.filterName, { [styles.active]: active })}
        >
          {name}
        </span>
      </div>
    </div>
  )
}

const FilterBar = () => {
  const [todoFilter, setTodoFilter] = useTodoFilter()

  const handleFilterClick = (filter) => () =>
    todoFilter !== filter && setTodoFilter(filter)

  return (
    <div className={styles.container}>
      <FilterOption
        name="All"
        active={todoFilter === todoFilters.ALL}
        onClick={handleFilterClick(todoFilters.ALL)}
      />
      <FilterOption
        name="Pending"
        active={todoFilter === todoFilters.PENDING}
        onClick={handleFilterClick(todoFilters.PENDING)}
      />
      <FilterOption
        name="Done"
        active={todoFilter === todoFilters.DONE}
        onClick={handleFilterClick(todoFilters.DONE)}
      />
    </div>
  )
}

export default FilterBar
