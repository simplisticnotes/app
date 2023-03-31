import FilterItem from "./FilterItem"

const Filters = ({ filter, setFilter }) => {
  return (
    <section className="shadow p-5 border border-gray-100 max-w-xl rounded mx-auto mb-6">
      <h2 className="font-semibold text-xl">Filters</h2>

      <div className="flex gap-7 flex-wrap mt-4">
        <FilterItem
          id="radio-all"
          label="All"
          checked={filter === "All"}
          onChange={() => setFilter("All")}
        />
        <FilterItem
          id="radio-completed"
          label="Completed"
          checked={filter === "Completed"}
          onChange={() => setFilter("Completed")}
        />
        <FilterItem
          id="radio-uncompleted"
          label="Uncompleted"
          checked={filter === "Uncompleted"}
          onChange={() => setFilter("Uncompleted")}
        />
      </div>
    </section>
  )
}

export default Filters
