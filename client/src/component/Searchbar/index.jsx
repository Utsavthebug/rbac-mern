import React from "react";

const SearchBar = ({
  search,
  name,
  setSearch
}) => {
  
  const handleChange = (e)=>{
    setSearch(e.target.value)
  }
  return (
    <div className="relative w-full md:w-80">
    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 dark:text-white text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
    </div>
    <input
    value={search}
    onChange={handleChange}
    type="text" 
    id="table-search-users" 
    className="block w-full h-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    placeholder={`Search ${name}`}/>
</div>
  )
}

export default SearchBar