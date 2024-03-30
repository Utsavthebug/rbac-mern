import { Suspense, useEffect } from "react"
import { useSelector,useDispatch } from 'react-redux'
import { fetchMe } from "./store/auth/authSlice"
import { Route, Routes } from "react-router-dom"
import { authRoutes } from "./constants/routes"

function App() {
  //fetching me data when session data 
  const dispatch = useDispatch()
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      dispatch(fetchMe())
    }
  },[])
  return (
   <Suspense fallback={<div>Loading....</div>}>
   <Routes>
    {
      ...authRoutes.map((authroute)=><Route path={authroute.path} element={<authroute.component/>} />)
    }
   </Routes>
   </Suspense>

  )
}

export default App
