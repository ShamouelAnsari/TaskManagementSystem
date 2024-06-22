import { useEffect, useState } from "react";
import * as yup from "yup";
import { validator } from '../utilities/projects'
import { login } from '../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../store/authSlice'
// import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    let dispatch = useDispatch()
    let userInfo = useSelector((state) => state.auth.userInfo)
    let navigate = useNavigate();
    let initialValue = { email: "", password: "" };
    const [formData, setfromData] = useState(initialValue)
    const [error, setError] = useState({});

    useEffect(() => {
        if (userInfo) {
            navigate("/Task")
        }
    }, [userInfo])

    async function handleSubmit(e) {
        e.preventDefault()
        let schema = yup.object({
            email: yup.string().email().required(),
            password: yup.string().required()
        })
        let valid = await validator(schema, formData).catch((error) => { return { error } })
        if (valid.error) {
            return setError(valid.error);
        }

        console.log("valid Data", valid);

        let data = await login(formData).catch((error) => { return { error } })
        if (data.error) {
            return alert("Invalid Email or Password user not loged in")
        }

        console.log("userData", data);

        dispatch(setCredentials(data))
        setfromData(initialValue)
        setError({})
    }

    function handleChange(e) {
        let temp = { ...formData }
        temp[e.target.name] = e.target.value
        setfromData(temp)
    }


    return (
        <>
            <div className="addUser">
                <h3>Login</h3>
                <form onSubmit={handleSubmit} className="addUserForm">
                    <div className="inputGroup">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                        {error.email && <p className="text-danger">{error.email}</p>}

                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                        {error.password && <p className="text-danger">{error.password}</p>}
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="login">
                    <p>Don't have an account ?</p>
                    <Link to="/Register" type="submit" className="btn btn-success">Sign Up</Link>
                </div>
            </div >
        </>
    )
}

export default Login;