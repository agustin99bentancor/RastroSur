import react from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderAdmin from "../component/headerAdmin.tsx";
import Sidebar from "../component/sidebar.tsx";
import { useAuth } from "../context/authContext.tsx";
import axios from "axios";
import { logoutUser } from "../services/authService.tsx";

export default function AdminLayout() {
    const { isAuthenticated, setAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    function handleLogout() {
        logoutUser()
            .then(() => {
                setAuthenticated(false);
                navigate('/');
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
        }
    
  return (
    <>
      <HeaderAdmin
        onLogout={handleLogout}/>
      <div className="layout">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}