import React, { useEffect, useState } from 'react'
import Table from '../component/Table'
import SearchBar from '../component/Searchbar'
import Button from '../component/Button'
import { table_constants } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoles } from '../store/roles/roleSlice'
import { convertUTCDateToLocalDate } from '../helpers/Datehelper'
import { fetchfeatures } from '../store/features/featureSlice'
import Checkbox from '../component/Checkbox'
import { IoMdPersonAdd } from 'react-icons/io'
import Input from '../component/Input'
import Modal from '../component/Modal'
import { useFormik } from 'formik'
import * as Yup from 'yup';


const createRoleSchema = Yup.object().shape({
  role_name: Yup.string().required('Role name is required'),
})

const CreateRoleModal = ({
  open,
  setModalOpen,
  selectedId,
  setSelectedId
})=>{

  const [initialValues,setInitialValues] = useState({
    role_name:"",
  })

  // useEffect(()=>{
  //   //getting data from state
  //   if(selectedId){
  //     const formData = users?.find((u)=>u.id==selectedId)
  //     setInitialValues({
  //       email:formData?.email,
  //       first_name:formData?.first_name,
  //       last_name:formData?.last_name,
  //       role:formData?.role?.role_id
  //     })
  //   }
  //   else{
  //     setInitialValues({
  //       email:"",
  //       password:"",
  //       first_name:"",
  //       last_name:"",
  //       role:""
  //     })
  //   }
  // },[selectedId])

  // const validationschema = selectedId ? updateUserSchema : createUserSchema


  const formik = useFormik({
    initialValues,
    validationSchema:createRoleSchema,
    validateOnBlur:false,
    validateOnChange:false,
    enableReinitialize:true,
    onSubmit:  async (values,{setErrors,resetForm})=>{
     let response = {}
    

    // response = !selectedId ? await dispatch(addUser(values)) : await dispatch(editUser({...values,id:selectedId}))
    
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


//if selectedId is present it is in edit Mode
const isEditMode = !!selectedId
  return (
    <Modal 
    open={open}
    onClose={toggleModal}
    title="Create Roles">
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
          
        </div>
    </div>

    <Button 
    icon={<IoMdPersonAdd/>}
    label={"Add New Roles"}/>
</form>
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

  const handleAddBtnClick = ()=>{
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
    <Table
    headers={table_constants.role_table.headers}
    data={renderRoleTable(roles?.roles)}
    columnKeys={table_constants.role_table.columnKeys}
    collapsible_table_headers={table_constants.role_table.collapsible_table_header}
    collapsible_table_columnKey={table_constants.role_table.collapsible_table_columnKeys}
   />
    </div>
    </React.Fragment>
  )
}

export default Roles