import React, { useState } from 'react'
import * as yup from "yup"
import { validator } from '../utilities/projects'
import { changePassword } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

    let initialVal = { oldPassword: "", newPassword: "" }
    const [formData, setFormData] = useState(initialVal)
    const [error, setError] = useState({})

    async function handleSubmit(e) {
        e.preventDefault()
        let schema = yup.object({
            oldPassword: yup.string().required(),
            newPassword: yup.string().required()
        })

        let valid = await validator(schema, formData).catch((error) => { return { error } })
        if (valid.error) {
            return setError(valid.error)
        }

        let data = await changePassword(formData).catch((error) => { return { error } })
        if (data.error) {
            return setError(data.error)
        }

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
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Old Password:</label>
                    <input type='password' name='oldPassword' placeholder='Enter Old Password' value={formData.oldPassword} onChange={handleChange} />
                    {error.oldPassword && <p>{error.oldPassword}</p>}
                </div>
                <div>
                    <label>New Password:</label>
                    <input type='password' name='newPassword' placeholder='Enter new Password' value={formData.newPassword} onChange={handleChange} />
                    {error.newPassword && <p>{error.newPassword}</p>}
                </div>
                <button type='submit'>submit</button>
            </form>
        </>
    )
}

export default ChangePassword