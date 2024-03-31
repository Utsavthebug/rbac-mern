import React from 'react'

const Input = ({
    label,
    name,
    type="text",
    handleChange,
    errors,
    required
}) => {
  return (
    <div>
    <label className="block text-sm font-medium leading-6 text-gray-900">{label}{required && <span className=' text-red-600'>*</span>}</label>
    <div className="mt-2">
      <input 
      name={name}
      autoComplete={type}
      onChange={handleChange} 
      type={type} 
      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

      {errors?.[name] && <span className='text-red-500 text-[12px] mt-3'>{errors?.[name]}</span>}
    </div>
  </div>
  )
}

export default Input