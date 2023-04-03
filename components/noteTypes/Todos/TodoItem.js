import { TrashIcon } from "@heroicons/react/24/outline"
import React from "react"
import Dropdown from "../../Dropdown"
import DropdownItem from "../../Dropdown/DropdownItem"

const TodoItem = ({ todo, onChange = () => {}, onDelete }) => {
  return (
    <div className="flex items-center gap-2 shadow mb-4 p-2 last:mb-0 rounded relative">
      <div className="form-control">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onChange}
            className="checkbox checkbox-primary checkbox-sm"
          />
        </label>
      </div>
      <p
        className={`text-lg ${
          todo.completed ? "text-gray-500 line-through" : ""
        }`}
      >
        {todo.name}
      </p>

      {onDelete && (
        <Dropdown className="ml-auto">
          <DropdownItem icon={TrashIcon} label="Delete" onClick={onDelete} />
        </Dropdown>
      )}
    </div>
  )
}

export default TodoItem
