import { Outlet, Navigate } from "react-router"
import { useAuth } from "@/context/AuthContext"

export default function ProtectedPage() {
    const { isAuth } = useAuth()

    if (!isAuth) { return <Navigate to="/login" replace /> }
    return <Outlet />
}