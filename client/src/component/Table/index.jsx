import React from 'react'
import TableRow from './TableRow'

const Table = ({
  headers=[],
  onEdit,
  onDelete,
  data=[],
  columnKeys=[],
  collapsible_table_headers=[]
}) => {

  const hasAction = onEdit || onDelete
  const final_headers = [
    ...headers,
    (hasAction && "Action")
  ]
  return (
    <div className="rounded-lg border border-gray-200 shadow-md">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
        {
          final_headers?.map((header,index)=>(
        <th key={index} scope="col" className="px-6 py-4 font-medium text-gray-900">{header==="Action"?"":header}</th>
          ))
        }
    
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">     
        {
          data?.map(d =>(
            <TableRow
            columnKeys={columnKeys}
            info={d}
            onDelete={onDelete}
            onEdit={onEdit}
            />
          ))
        }
      
    </tbody>
  </table>
</div>
  )
}

export default Table