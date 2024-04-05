import { Suspense, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { fetchMe } from "./store/auth/authSlice"
import { Route, Routes } from "react-router-dom"
import { adminRoutes, authRoutes } from "./constants/routes"
import ProtectedRoutes from "./component/ProtectedRoutes"
import DashboardLayout from "./component/Layout/DasboardLayout"

function App() {
  //fetching me data when session data 
  const dispatch = useDispatch()
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      dispatch(fetchMe())
    }
  },[])

  const isAuth = !!sessionStorage.getItem('token')

  return (
   <Suspense fallback={<div>Loading....</div>}>
   <Routes>
    {
      ...authRoutes.map((authroute)=><Route path={authroute.path} element={<authroute.component/>} />)
    }
    {/* protected routes */}
    <Route element={<ProtectedRoutes isAuth={isAuth} permissions={['admin']}/>}>
      <Route element={<DashboardLayout/>}> 
      {
        ...adminRoutes.map((adminRoute)=><Route
        path={adminRoute.path}
        element={<adminRoute.component/>}
        />)
      }
      </Route>
    </Route>

   </Routes>
   </Suspense>

  )
}

export default App
