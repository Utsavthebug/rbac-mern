import React, { useEffect, useState } from 'react'
import Table from '../component/Table'
import SearchBar from '../component/Searchbar'
import Button from '../component/Button'
import { table_constants } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { createRole, deleteRole, fetchRoles } from '../store/roles/roleSlice'
import { convertUTCDateToLocalDate } from '../helpers/Datehelper'
import { fetchfeatures } from '../store/features/featureSlice'
import Checkbox from '../component/Checkbox'
import { IoMdPersonAdd } from 'react-icons/io'
import Input from '../component/Input'
import Modal from '../component/Modal'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';


const createRoleSchema = Yup.object().shape({
  role_name: Yup.string().required('Role name is required'),
})


const renderSubTableData = ({data,features,handleCheckBoxChange,readOnly=true})=>{
  return data.map((d)=>{
    return {
      id:d?.featureId,
     name: <div className='capitalize font-medium text-gray-700'>
      {features.find((feature)=>feature?.feature_id==d?.featureId)?.feature_name}
     </div> ,
     read : <Checkbox 
     handleChange={handleCheckBoxChange} value='read' readOnly={readOnly} name={d?.featureId} type='radio'  checked={d?.feature_access==="read"}/>,
     write: <Checkbox handleChange={handleCheckBoxChange} value='write' readOnly={readOnly} name={d?.featureId}  type='radio'   checked={d?.feature_access==="write"}/>,
     none: <Checkbox handleChange={handleCheckBoxChange} value='none' readOnly={readOnly} name={d?.featureId}  type='radio'   checked={d?.feature_access==="none"}/>
    }
  })
}


const renderRoleTable = (data,features)=>{
  return data.map((d)=>{
    return {
      id:d?.role_id,
      name: <div className='capitalize font-medium text-gray-700'>{d?.role_name}</div>,
      createdAt:convertUTCDateToLocalDate(d?.created_at),
      description:d?.description,
      children:renderSubTableData({data:d?.featuretoroles,features})
    }
  })
}

const CreateRoleModal = ({
  open,
  setModalOpen,
  selectedId,
  setSelectedId
})=>{

  //getting features from state 
  const {features} = useSelector((state)=>state.features)
  const {roles} = useSelector((state)=>state.role)
  const [selectedFeatures,setSelectedFeatures] = useState([])
  const dispatch = useDispatch()

  const [initialValues,setInitialValues] = useState({
    role_name:"",
  })


  useEffect(()=>{
    //getting data from state
    if(selectedId){
      const formData = roles?.find((role)=>role?.role_id==selectedId)
      setInitialValues({
        role_name:formData?.role_name
      })
      setSelectedFeatures(formData?.featuretoroles)
    }
  },[selectedId,roles])


  const FeatureDropdownOptions =(data)=>{
    return data.map((d)=>{
      return {
        value:d?.feature_id,
        label:d?.feature_name
      }
    })
  } 

  const formik = useFormik({
    initialValues,
    validationSchema:createRoleSchema,
    validateOnBlur:false,
    validateOnChange:false,
    enableReinitialize:true,
    onSubmit:  async (values,{setErrors,resetForm})=>{
     let response = {}
    
    response = await dispatch(createRole({...values,featuretoroles:selectedFeatures}))
    
    if(response?.error){
    //  toast.error(response.payload)
    }
    else {
      resetForm()
      setModalOpen(false)
    }
    }
  })

  const toggleModal = ()=>{
    setModalOpen((prev)=>!prev)
    formik.resetForm()
    setSelectedId(undefined)
  }

 
  const handleFeatureSelect = (d)=>{
    //getting list of selected Ids 
    const selected_ids = selectedFeatures.map((d)=>d?.featureId)

    //setting default none to features 
    const new_selected_array = d.map((data)=>{
      if(!selected_ids.includes(data.value)){
        return {
          featureId:data.value,
          feature_access:'none'
        }
      }
     //select object from selected 
     else{
      const selected_feature = selectedFeatures.find((selected)=>selected.featureId==data.value)
      return selected_feature
     }
    
    })
    setSelectedFeatures(new_selected_array)
  }

  const handleCheckBoxChange=(chekboxData)=>{
    const mapped_selected_feature = selectedFeatures.map((selected)=>((chekboxData.id===selected.featureId ? { ...selected,feature_access:chekboxData.value } : selected)))
    setSelectedFeatures(mapped_selected_feature)
  }


//if selectedId is present it is in edit Mode
  return (
    <Modal 
    open={open}
    onClose={toggleModal}
    title="Create Roles">
    <>
  <form onSubmit={formik.handleSubmit} className="p-4 md:p-5" noValidate>
    <div className="grid gap-4 mb-4 grid-cols-2">
  <div className="col-span-2">
      <Input
          label={"Role Name"}
          type='text'
          errors={formik.errors}
          handleChange={formik.handleChange}
          value={formik.values.role_name}
          name="role_name"
          required
          />
      </div>

        <div className="col-span-2">
         <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Features</label>
        <Select
        closeMenuOnSelect={true}
        isMulti
        onChange={handleFeatureSelect}
        options={FeatureDropdownOptions(features)}
        />
        </div>
    </div>

  {selectedFeatures.length >0 && <div className='max-h-[200px] overflow-y-auto overflow-x-hidden table-scrollbar'>
 <Table
  headers={[" ","Read","Write","None"]}
  data={renderSubTableData({data:selectedFeatures,features,readOnly:false,handleCheckBoxChange})}
  columnKeys={["name","read","write","none"]}
  />
  </div>}

  <div className='mt-2'></div>

<Button 
icon={<IoMdPersonAdd/>}
label={"Add New Roles"}/>
</form>


</>
</Modal>
  )
};



const Roles = () => {
  const [modalOpen,setModalOpen] = useState(false)
  const [selectedId,setSelectedId] = useState(undefined)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchRoles())
    dispatch(fetchfeatures())
  },[dispatch])

  const roles = useSelector((state)=>state.role)
  const {features} = useSelector((state)=>state.features)




  const handleAddBtnClick = ()=>{
    setModalOpen(true)
  }

  const handleRoleDelete = (data)=>{
    dispatch(deleteRole(data?.id))
  }

  const handleRoleUpdate=(data)=>{
    setSelectedId(data?.id)
    setModalOpen(true)
  }

  return (
    <React.Fragment>
      {
        modalOpen && <CreateRoleModal
        open={modalOpen}
        setModalOpen={setModalOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        />
      }

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
      onClick={handleAddBtnClick}
      />
      </div>
    </div>
    <div className='h-[calc(100vh-7rem)] overflow-auto mb-10 table-scrollbar'>
    <Table
    headers={table_constants.role_table.headers}
    data={renderRoleTable(roles?.roles,features)}
    onDelete={handleRoleDelete}
    onEdit={handleRoleUpdate}
    columnKeys={table_constants.role_table.columnKeys}
    collapsible_table_headers={table_constants.role_table.collapsible_table_header}
    collapsible_table_columnKey={table_constants.role_table.collapsible_table_columnKeys}
   />
    </div>
    </div>
    </React.Fragment>
  )
}

export default Roles