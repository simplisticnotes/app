import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import Filters from "./Filters"
import TodoForm from "./TodoForm"
import { updateTodoNote } from "../../../core/notes"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { v4 as uuid } from "uuid"
import useFilterTodos from "../../../hooks/useFilterTodos"

const Todos = ({ noteId, todos: initialTodos }) => {
  const [todoName, setTodoName] = useState("")
  const [todos, setTodos] = useState(initialTodos)
  const [addLoading, setAddLoading] = useState(false)

  const { filter, setFilter, filteredTodos } = useFilterTodos(todos)

  const supabase = useSupabaseClient()

  const addTodoHandler = async (e) => {
    e.preventDefault()

    setAddLoading(true)

    const newTodos = [
      ...todos,
      { id: uuid(), name: todoName, completed: false }
    ]

    await updateTodoNote(supabase, noteId, newTodos)

    setTodos(newTodos)
    setTodoName("")

    setAddLoading(false)
  }

  const deleteTodoHandler = async (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)

    setTodos(newTodos)

    await updateTodoNote(supabase, noteId, newTodos)
  }

  const toggleCompleteTodo = async (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(newTodos)

    await updateTodoNote(supabase, noteId, newTodos)
  }

  return (
    <>
      <Filters filter={filter} setFilter={setFilter} />

      <section className="min-h-[20rem] shadow p-5 border border-gray-100 max-w-xl rounded mx-auto">
        <TodoForm
          onSubmit={addTodoHandler}
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          loading={addLoading}
          disabled={todoName.trim().length === 0}
        />

        <div className="mt-7">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={() => toggleCompleteTodo(todo.id)}
              onDelete={() => deleteTodoHandler(todo.id)}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Todos
