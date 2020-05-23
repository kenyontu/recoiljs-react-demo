import { useCallback, useRef } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import debounce from 'lodash/debounce'
import shortid from 'shortid'

import * as todosApi from '../utils/api/todosApi'

export const todoFilters = {
  ALL: 'all',
  PENDING: 'pending',
  DONE: 'done',
}

const todosState = atom({
  key: 'todosState',
  default: [],
})

const isFetchingTodosState = atom({
  key: 'isFetchingTodos',
  default: false,
})

const todoFilterState = atom({
  key: 'todoFilterState',
  default: todoFilters.ALL,
})

const filteredTodosState = selector({
  key: 'filteredTodosState',
  get: ({ get }) => {
    const filter = get(todoFilterState)
    const todos = get(todosState)

    if (filter === todoFilters.PENDING) {
      return todos.filter((t) => !t.isDone)
    } else if (filter === todoFilters.DONE) {
      return todos.filter((t) => t.isDone)
    }

    return todos
  },
})

export const useFetchTodos = () => {
  const setTodos = useSetRecoilState(todosState)
  const setIsFetching = useSetRecoilState(isFetchingTodosState)

  const fetchTodos = useCallback(async () => {
    setIsFetching(true)
    const result = await todosApi.fetchTodos().catch((error) => {})

    if (result) {
      setTodos(result)
    }

    setIsFetching(false)
  }, [setIsFetching, setTodos])

  return fetchTodos
}

export const useTodos = () => {
  const todos = useRecoilValue(filteredTodosState)
  const isFetchingTodos = useRecoilValue(isFetchingTodosState)

  return {
    todos,
    isFetchingTodos,
  }
}

export const useTodoFilter = () => {
  return useRecoilState(todoFilterState)
}

export const useCreateTodo = () => {
  const setTodos = useSetRecoilState(todosState)

  const createTodo = useCallback(
    async (description) => {
      const todo = { id: shortid(), description, isDone: false }
      const result = await todosApi.createTodo(todo)

      if (result) {
        setTodos((todos) => [...todos, result])
      }
    },
    [setTodos]
  )

  return createTodo
}

export const useUpdateTodo = () => {
  const setTodos = useSetRecoilState(todosState)
  const updateApiCallRef = useRef()

  if (!updateApiCallRef.current) {
    updateApiCallRef.current = debounce((todo) => {
      todosApi.updateTodo(todo)
    }, 2000)
  }

  const updateTodo = useCallback(
    (todo, overwriteAfterDone = true) => {
      setTodos((todos) => {
        updateApiCallRef.current(todo)
        const i = todos.findIndex((t) => t.id === todo.id)
        return [...todos.slice(0, i), todo, ...todos.slice(i + 1)]
      })
    },
    [setTodos]
  )

  return updateTodo
}

export const useDeleteTodo = () => {
  const setTodos = useSetRecoilState(todosState)

  const deleteTodo = useCallback(
    (todoId) => {
      todosApi.deleteTodo(todoId).then(() => {
        setTodos((todos) => todos.filter((t) => t.id !== todoId))
      })
    },
    [setTodos]
  )

  return deleteTodo
}
