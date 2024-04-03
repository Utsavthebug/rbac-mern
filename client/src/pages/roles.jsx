import React, { useEffect } from 'react'
import Table from '../component/Table'
import SearchBar from '../component/Searchbar'
import Button from '../component/Button'
import { table_constants } from '../constants/constants'
import { useDispatch } from 'react-redux'
import { fetchRoles } from '../store/roles/roleSlice'

const Roles = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchRoles())
  })
  return (
    <div className='p-5'>
    <div className='flex mb-8 justify-between'>
      <h1 className=' text-xl font-bold'>
        Role Management
      </h1>

      <div className='flex space-x-4'>
      <SearchBar
      name="roles"
      />

      <Button
      label={"Add Role"}
      />
      </div>
    </div>
    <Table

    />
    </div>
  )
}

export default Roles