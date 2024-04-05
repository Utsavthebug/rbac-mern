import React from 'react'

const Dropdown = ({
    name,
    errors,
    label,
    required,
    options=[],
    handleChange,
    value
}) => {
  return (
     <>
    <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}{required&&<span className='text-red-500'>*</span>}</label>
    <select value={value} onChange={handleChange} name={name} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
        <option selected="">Select {label}</option>
        {
            options.map((d)=>(
                <option selected={d?.value===value} value={d?.value}>{d?.label}</option>
            ))
        }
    </select>
    {errors?.[name] && <span className='text-red-500 text-[12px] mt-3'>{errors?.[name]}</span>}
    </>
  )
}

export default Dropdown