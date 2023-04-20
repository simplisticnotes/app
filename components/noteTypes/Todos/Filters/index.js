import FilterItem from "./FilterItem"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"

const Filters = ({ filter, setFilter }) => {
  return (
    <section
      tabIndex={0}
      className="collapse collapse-arrow shadow border border-gray-100 max-w-xl rounded mx-auto mb-6"
    >
      <input type="checkbox" className="peer" />
      <h2 className="font-semibold text-xl collapse-title flex items-center gap-2">
        <AdjustmentsHorizontalIcon className="w-5 -mt-1" /> Filters
      </h2>

      <div className="flex gap-7 flex-wrap collapse-content">
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
