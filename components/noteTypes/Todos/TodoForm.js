import { PlusIcon } from "@heroicons/react/24/outline"
import Spinner from "../../Spinner"

const TodoForm = ({ onSubmit, value, onChange, loading, disabled }) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Type your todo..."
        className="input input-bordered shadow grow"
        value={value}
        onChange={onChange}
      />

      <button className="btn btn-primary shadow" disabled={disabled}>
        {loading ? <Spinner /> : <PlusIcon className="w-6" />}
      </button>
    </form>
  )
}

export default TodoForm
