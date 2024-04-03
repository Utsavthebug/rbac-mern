import React, { useEffect, useState } from 'react'
import Button from '../component/Button'
import SearchBar from '../component/Searchbar'
import Table from '../component/Table'
import { table_constants } from '../constants/constants'
import Modal from '../component/Modal'
import { useFormik} from 'formik';
import * as Yup from 'yup';
import Input from '../component/Input'
import { IoMdPersonAdd } from "react-icons/io";
import Dropdown from '../component/Dropdown'
import {useDispatch, useSelector} from 'react-redux'
import { addUser, deleteUser, editUser, fetchAllUsers } from '../store/users/userSlice'
import FeatureText from '../component/FeatureText'
import { toast } from 'react-toastify'
import { createFeatures, deleteFeatures, fetchfeatures, updateFeatures } from '../store/features/featureSlice'
import Checkbox from '../component/Checkbox'
import { convertUTCDateToLocalDate } from '../helpers/Datehelper'



const createfeatureSchema = Yup.object().shape({
  feature_name: Yup.string().required('Feature name is required'),
  active:Yup.boolean().required('active is required')
})



const CreateFeatureModal = ({
  open,
  setModalOpen,
  selectedId,
  setSelectedId
})=>{
  const dispatch = useDispatch()
  const {features} = useSelector((state)=>state.features)


  const [initialValues,setInitialValues] = useState({
    feature_name:"",
    active:false
  })

  useEffect(()=>{
    //getting data from state
    if(selectedId){
      const formData = features?.find((u)=>u.feature_id==selectedId)
      console.log('formdata',formData)
      setInitialValues({
        feature_name:formData?.feature_name,
        active:formData?.active,
      })
    }
  },[selectedId])



  const formik = useFormik({
    initialValues,
    validationSchema:createfeatureSchema,
    validateOnBlur:false,
    validateOnChange:false,
    enableReinitialize:true,
    onSubmit:  async (values,{setErrors,resetForm})=>{
     let response = !selectedId ? await dispatch(createFeatures(values)) : await dispatch(updateFeatures({...values,id:selectedId}))
    
     if(response?.error){
      toast.error(response.payload)
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
    title="Create Features">
  <form onSubmit={formik.handleSubmit} className="p-4 md:p-5" noValidate>
    <div className="grid gap-4 mb-4 grid-cols-2">
  <div className="col-span-2 sm:col-span-1">
      <Input
          label={"Feature Name"}
          type='text'
          errors={formik.errors}
          handleChange={formik.handleChange}
          value={formik.values.feature_name}
          name="feature_name"
          required
          />
      </div>
 
        <div className="col-span-2">
        <Checkbox
        label="Active"
        name="active"
        handleChange={formik.handleChange}
        checked={formik.values.active}
        />      
         </div>
    </div>

    <Button 
    icon={<IoMdPersonAdd/>}
    label={"Add New Users"}/>
</form>
</Modal>
  )
};


const Features = () => {
  const dispatch = useDispatch()
  
  //getting features from state 
  const {features} = useSelector((state)=>state.features)
  const [modalOpen,setModalOpen] = useState(false)
  const [selectedId,setSelectedId] = useState(undefined)
  const [search,setSearch] = useState('')
  

  

  useEffect(()=>{
    dispatch(fetchfeatures())
  },[])


  const renderfeatureTable = (features) =>{
    return features?.map((feature)=>{
      return {
        id:feature.feature_id,
        name: <div className="capitalize font-medium text-gray-700">{feature?.feature_name}</div>,
        createdAt: convertUTCDateToLocalDate(feature?.created_at),
        active: <Checkbox 
        readOnly={true}
        checked={feature.active} />
      }
    })
  }

  const handleEditClick=(data)=>{
    setSelectedId(data?.id)
    setModalOpen(true)
  }

  const handleDeleteClick =(data)=>{
    console.log(data)
    dispatch(deleteFeatures(data?.id))
  }

    return (
      <>
      {
        modalOpen && <CreateFeatureModal
        open={modalOpen}
        setModalOpen={setModalOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        />
      }
      
        <div className='p-5'>
        <div className='flex mb-8 justify-between'>
          <h1 className=' text-xl font-bold'>
            Features Management
          </h1>
    
          <div className='flex space-x-4'>
          <SearchBar
          name="features"
          search={search}
        //   handleChange={handleSearchChange}
        //   onkeydown={handleKeyDown}
          />
    
          <Button
          label={"Add Features"}
          onClick={()=>setModalOpen(true)}
          />
          </div>
        </div>
        <div className='h-[calc(100vh-7rem)] overflow-auto mb-10 table-scrollbar'>
        <Table
        headers={table_constants.feature_table.headers}
        onDelete={handleDeleteClick}
        data={renderfeatureTable(features)}
        onEdit={handleEditClick}
        columnKeys={table_constants.feature_table.columnKeys}
        />
        </div>
        </div>
      </>
      )
}

export default Features