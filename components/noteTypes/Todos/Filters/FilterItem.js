const FilterItem = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        name="radio-2"
        id={id}
        className="radio radio-primary radio-sm"
        onChange={onChange}
        checked={checked}
      />
      <label className="cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default FilterItem
