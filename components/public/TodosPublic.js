import useFilterTodos from "../../hooks/useFilterTodos"
import Filters from "../noteTypes/Todos/Filters"
import TodoItem from "../noteTypes/Todos/TodoItem"

const TodosPublic = ({ todos }) => {
  const { filter, setFilter, filteredTodos } = useFilterTodos(todos)

  return (
    <div>
      <Filters filter={filter} setFilter={setFilter} />

      <div className="mt-7">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default TodosPublic
