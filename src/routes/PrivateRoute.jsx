import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate, Outlet } from 'react-router-dom'
import Loader from "../components/Loader/Loader"

function PrivateRoute() {

    const { isLoading, user } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/iniciar-sesion" />
    }

    return <Outlet />
}

export default PrivateRoute