import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgetPassword } from '../services/authService'
import { validator } from '../utilities/projects'
import * as yup from "yup"

function ForgetPassword() {

    let navigate = useNavigate()
    let initialVal = { email: "" }
    const [email, setEmail] = useState(initialVal)
    const [error, setError] = useState({})

    async function handleSubmit(e) {
        e.preventDefault()
        let schema = yup.object({
            email: yup.string().email().required()
        })

        let valid = await validator(schema, email).catch((error) => { return { error } })
        console.log("valid data: ", valid);
        if (valid.error) {
            return setError(valid.error)
        }

        let data = await forgetPassword(email).catch((error) => { return { error } })
        console.log("data data: ", data);
        if (data.error) {
            return setError(data.error)
        }
        setEmail(navigate("/resetPassword"))
        setError({})
    }

    async function handleChange(e) {
        let temp = { ...email }
        temp[e.target.name] = e.target.value
        setEmail(temp)
    }

    return (
        <>
            <h1>FORGET PASSWORD</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input type="email" name='email' value={email.email} placeholder='Enter Email' onChange={handleChange} />
                    {error.email && <p>{error.email}</p>}
                </div>
                <button type='submit'>Get OTP</button>
            </form>
        </>
    )
}

export default ForgetPassword