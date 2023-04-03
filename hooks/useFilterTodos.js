import { useEffect, useState } from "react"

const useFilterTodos = (todos) => {
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [filter, setFilter] = useState("All")

  // apply filter
  useEffect(() => {
    if (filter === "All") {
      setFilteredTodos(todos)
    } else if (filter === "Completed") {
      setFilteredTodos(todos.filter((todo) => todo.completed))
    } else if (filter === "Uncompleted") {
      setFilteredTodos(todos.filter((todo) => !todo.completed))
    }
  }, [filter, todos])

  return {
    filter,
    setFilter,
    filteredTodos
  }
}

export default useFilterTodos
