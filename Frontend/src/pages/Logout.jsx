import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../App.css"
function Logout() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let userInfo = useSelector((state)=>{return state.auth.userInfo})
    
    useEffect(() => {
        handleLogout()
    }, [])

    async function handleLogout() {
        let data = await logoutUser(userInfo.token).catch((error) => { return { error } })
        console.log("data Logout",data);
        if (data.error) {
            navigate("/Task")
        }
        dispatch(logout())
        navigate("/Login")
    }
    return (
        <>
            <div className="col-12">
                <h2>
                    ~~ WELCOME TO Logout PAGE ~~
                </h2>
            </div>
        </>
    )
}

export default Logout;