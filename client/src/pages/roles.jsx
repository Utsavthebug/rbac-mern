import React, { useEffect } from 'react'
import Table from '../component/Table'
import SearchBar from '../component/Searchbar'
import Button from '../component/Button'
import { table_constants } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoles } from '../store/roles/roleSlice'
import { convertUTCDateToLocalDate } from '../helpers/Datehelper'
import { fetchfeatures } from '../store/features/featureSlice'
import Checkbox from '../component/Checkbox'

const Roles = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchRoles())
    dispatch(fetchfeatures())
  },[])

  const roles = useSelector((state)=>state.role)
  const {features} = useSelector((state)=>state.features)

  const renderSubTableData = (data)=>{
    return data.map((d)=>{
      return {
       name: <div className='capitalize font-medium text-gray-700'>
        {features.find((feature)=>feature?.feature_id==d?.featureId)?.feature_name}
       </div> ,
       read : <Checkbox checked={d?.feature_access==="read"}/>,
       write: <Checkbox  checked={d?.feature_access==="write"}/>,
       none: <Checkbox  checked={d?.feature_access==="none"}/>
      }
    })
  }


  const renderRoleTable = (data)=>{
    return data.map((d)=>{
      return {
        id:d?.role_id,
        name: <div className='capitalize font-medium text-gray-700'>{d?.role_name}</div>,
        createdAt:convertUTCDateToLocalDate(d?.created_at),
        description:d?.description,
        children:renderSubTableData(d?.featuretoroles)
      }
    })
  }
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
    headers={table_constants.role_table.headers}
    data={renderRoleTable(roles?.roles)}
    columnKeys={table_constants.role_table.columnKeys}
    collapsible_table_headers={table_constants.role_table.collapsible_table_header}
    collapsible_table_columnKey={table_constants.role_table.collapsible_table_columnKeys}
   />
    </div>
  )
}

export default Roles