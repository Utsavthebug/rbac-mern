import React from 'react';
import Input from '../component/Input';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/auth/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password:Yup.string().required("Password is required")
})


function Login() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:LoginSchema,
    validateOnBlur:false,
    validateOnChange:false,
    enableReinitialize:true,
    onSubmit: values=>{
      dispatch(loginUser(values))
    }
  })


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          <Input
          label={"Email address"}
          type='email'
          errors={formik.errors}
          handleChange={formik.handleChange}
          name="email"
          value={formik.values.email}
          />

          <Input
          label={"Password"}
          type='password'
          name="password"
          errors={formik.errors}
          handleChange={formik.handleChange}
          value={formik.values.password}
          />

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
