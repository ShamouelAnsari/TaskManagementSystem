import React, { useState } from 'react'
import * as yup from "yup"
import { validator } from '../utilities/projects'
import { resetPassword } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {

    let initialVal = { otp: "", email: "", password: "" }
    let navigate = useNavigate()
    const [formData, setFormData] = useState(initialVal)
    const [error, setError] = useState({})

    async function handleSubmit(e) {
        e.preventDefault()
        let schema = yup.object({
            otp: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(8)
        })

        let valid = await validator(schema, formData).catch((error) => { return { error } })
        if (valid.error) {
            return setError(valid.error)
        }

        let data = await resetPassword(formData).catch((error) => { return { error } })
        if (data.error) {
            return setError(data.error)
        }
        setFormData(navigate("/Login"))
        setError({})
    }

    async function handleChange(e) {
        let temp = { ...formData }
        temp[e.target.name] = e.target.value
        setFormData(temp)
    }

    return (
        <>
            <h1>RESET PASSWORD</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>OTP:</label>
                    <input type="text" name='otp' value={formData.otp} onChange={handleChange} placeholder='Enter OTP' />
                    {error.otp && <p>{error.otp}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter email' />
                    {error.email && <p>{error.email}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter password' />
                    {error.password && <p>{error.password}</p>}
                </div>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default ResetPassword