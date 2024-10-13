import {  useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {

    const {userData}=useSelector((state)=>state.authProjext)

    if(!userData){
      return  <Navigate to='/login'/>

    }
       return children
}

export default ProtectedRoute
