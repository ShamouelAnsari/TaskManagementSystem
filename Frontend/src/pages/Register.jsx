import { useState } from "react";
import * as yup from "yup"
import { validator } from "../utilities/projects";
import { register } from "../services/authService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { Link } from "react-router-dom";

function Register() {
    let dispatch = useDispatch()
    let initialVal = { username: "", email: "", password: "" }
    const [formData, setFormData] = useState(initialVal)
    const [error, setError] = useState({})

    async function handleSubmit(e) {
        e.preventDefault()
        let schema = yup.object({
            username: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        })

        let valid = await validator(schema, formData).catch((error) => { return { error } })
        if (valid.error) {
            return setError(valid.error)
        }

        let data = await register(formData).catch((error) => { return { error } })
        if (data.error) {
            return setError(data.error)
        }
        dispatch(setCredentials(data))
        setFormData(initialVal)
        setError({})
    }

    async function handleChange(e) {
        let temp = { ...formData }
        temp[e.target.name] = e.target.value
        setFormData(temp)
    }

    return (
        <>
            <div className="addUser">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit} className="addUserForm">
                    <div className="inputGroup">
                        <label>Username: </label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" />
                        {error.username ? <p>{error.username}</p> : null}

                        <label>email: </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                        {error.email ? <p>{error.email}</p> : null}

                        <label>Password: </label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
                        {error.password ? <p>{error.password}</p> : null}
                        <button type="submit" className="btn btn-success">Register</button>
                    </div>
                </form>
                <div className="login">
                    <p>Already have an account ?</p>
                    <Link to="/Login" type="submit" className="btn btn-primary">Login</Link>
                </div>
            </div>
        </>
    )
}

export default Register;