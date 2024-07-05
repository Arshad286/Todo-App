import React from 'react'

const FilterTodo = ({filter, setFilter}) => {
  return (
    <div className='flex gap-4 mt-4'>
        <div>
            <label className='input-label'>Filter by Status</label>
            <select className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
      >

                <option value="all">All Todo</option>
                <option value="to-do">To Do</option>
                <option value="done">Done</option>
            </select>
        </div>

        <div>
        <label className="input-label">Filter by Overdue</label>
        <select
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          value={filter.overdue}
          onChange={(e) => setFilter({ ...filter, overdue: e.target.value })}
        >
          <option value="all">All</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

    </div>
  )
}

export default FilterTodo 