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
import { addUser, fetchAllUsers } from '../store/users/userSlice'
import FeatureText from '../component/FeatureText'

const createUserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password:Yup.string().required("Password is required"),
  first_name:Yup.string().required("First Name is required"),
  last_name:Yup.string().optional(),
  role:Yup.string().required("Role is required")
})


export const roles_options = (roles)=>{
  return roles.map((role)=>({
    value:role.role_id,
    label:role.role_name
  }))
}


const CreateUserModal = ({
  open
})=>{
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      first_name:"",
      last_name:""
    },
    validationSchema:createUserSchema,
    validateOnBlur:false,
    validateOnChange:false,
    enableReinitialize:true,
    onSubmit: async values=>{
     await dispatch(addUser(values))
    }
  })

  const {roles} = useSelector((state)=>state.role)

  return (
    <Modal 
    open={open}
    title="Create User">
  <form onSubmit={formik.handleSubmit} className="p-4 md:p-5">
    <div className="grid gap-4 mb-4 grid-cols-2">
  <div className="col-span-2 sm:col-span-1">
      <Input
          label={"First Name"}
          type='text'
          errors={formik.errors}
          handleChange={formik.handleChange}
          name="first_name"
          required
          />
      </div>

    <div className="col-span-2 sm:col-span-1">
          <Input
          label={"Last Name"}
          type='text'
          errors={formik.errors}
          handleChange={formik.handleChange}
          name="last_name"
          />

    </div>

        <div className="col-span-2">
            <Input
              label={"Email address"}
              type='email'
              errors={formik.errors}
              handleChange={formik.handleChange}
              name="email"
              required
            />
        </div>

        <div className="col-span-2">
            <Input
              label={"Password"}
              type='password'
              errors={formik.errors}
              handleChange={formik.handleChange}
              name="password"
              required
            />
        </div>

        <div className="col-span-2">
          <Dropdown
          name={"role"}
          handleChange={formik.handleChange}
          label={"Role"}
          required
          errors={formik.errors}
          options={roles_options(roles)}
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


const Users = () => {
  const [modalOpen,setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const users = useSelector((state)=>state.users)


  const handleClick = ()=>{
    setModalOpen(true)
  }

  useEffect(()=>{
    dispatch(fetchAllUsers())
  },[])

  const RenderName = (user)=>{
    return (
      <div className="text-sm">
      <div className="font-medium text-gray-700">{user.first_name} {user.last_name}</div>
      <div className="text-gray-400">{user.email}</div>
    </div>
    )
  }

const RenderRole = (role)=>{
  return <FeatureText>
      {role}
  </FeatureText>
}

  const renderUserTable = (users) =>{
    return users.map((user)=>{
      return {
        id:user.id,
        name : RenderName(user),
        role: RenderRole(user.role.role_name)
      }
    })
  }

    return (
      <>
      <CreateUserModal
      open={modalOpen}
      />
        <div className='p-5'>
        <div className='flex mb-8 justify-between'>
          <h1 className=' text-xl font-bold'>
            User Management
          </h1>
    
          <div className='flex space-x-4'>
          <SearchBar
          name="users"
          />
    
          <Button
          label={"Add Users"}
          onClick={handleClick}
          />
          </div>
        </div>
        <Table
        headers={table_constants.user_table.headers}
        onDelete={true}
        data={renderUserTable(users?.users)}
        onEdit={true}
        columnKeys={['name','role']}
        />
        </div>
      </>
      )
}

export default Users