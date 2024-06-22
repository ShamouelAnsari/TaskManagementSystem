import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { editTask, taskDetails } from '../services/taskServices'
import * as yup from "yup"
import { validator } from '../utilities/projects'
import { useDispatch } from 'react-redux'
import { updateTask } from '../store/taskSlice'

function TaskUpdate() {
    let { id } = useParams()
    let initialVal = { taskName: "", taskDescription: "", expectedStartDate: "", expectedEndDate: "" }
    let [formData, setFormData] = useState(initialVal)
    let [error, setError] = useState({})
    let [status,setStatus] = useState(false)
    let dispatch = useDispatch()

    useEffect(() => {
        getTask()
    }, [])

    async function getTask() {
        let data = await taskDetails(id).catch(error => { return { error } })
        if (data.error) {
            setStatus(false)
            return alert(data.error)
        }

        let tempForm = {
            taskName: data.taskName,
            taskDescription: data.taskDescription,
            expectedStartDate: data.expectedStartDate,
            expectedEndDate: data.expectedEndDate
        }
        setFormData(tempForm)
    }

    function handleChange(e) {
        setFormData({ ...formData,[e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let schema = yup.object({
            taskName: yup.string(),
            taskDescription: yup.string(),
            expectedStartDate: yup.date().nullable(true),
            expectedEndDate: yup.date().nullable(true)
        })

        let check = await validator(schema, formData).catch(error => { return { error } })
        if (check.error) {
            setStatus(false)
            return setError(check.error)
        }

        let data = await editTask(id, formData).catch(error => { return { error } })
        if (data.error) {
            setStatus(false)
            return setError(data.error)
        }
        console.log("Update Data: ",data);
        dispatch(updateTask({ ...formData, ["id"]: id }))
        setStatus(true)
    }

    return (
        <>
            {status && <p>Succesfully Updated</p>}
            {Array.isArray(error) && error.map((err, index)=>{
                return <p key={index}>{err}</p>
            })}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Task Name: </label>
                    <input type="text" name='taskName' value={formData.taskName} onChange={handleChange} placeholder='Task Name' />
                    {error.taskName && <p>{error.taskName}</p>}
                </div>
                <div>
                    <label>Task Description: </label>
                    <input type='text' name='taskDescription' value={formData.taskDescription} onChange={handleChange} placeholder='Task Description' />
                    {error.taskDescription && <p>{error.taskDescription}</p>}
                </div>
                <div>
                    <label>Task ExpectedStartDate: </label>
                    <input type='date' name='expectedStartDate' value={formData.expectedStartDate} onChange={handleChange} placeholder='Task ExpectedStartDate' />
                    {error.expectedStartDate && <p>{error.expectedStartDate}</p>}
                </div>
                <div>
                    <label>Task ExpectedEndDate: </label>
                    <input type='date' name='expectedEndDate' value={formData.expectedEndDate} onChange={handleChange} placeholder='Task ExpectedEndDate' />
                    {error.expectedEndDate && <p>{error.expectedEndDate}</p>}
                </div>
                <button type="submit">Update</button >
            </form>
        </>
    )
}

export default TaskUpdate;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { editTask, taskDetails } from '../services/taskServices';
// import * as yup from "yup";
// import { validator } from '../utilities/projects';
// import { useDispatch } from 'react-redux';
// import { updateTask } from '../store/taskSlice';

// function TaskUpdate() {
//     let { id } = useParams();
//     let initialVal = { taskName: "", taskDescription: "", expectedStartDate: "", expectedEndDate: "" };
//     let [formData, setFormData] = useState(initialVal);
//     let [error, setError] = useState({});
//     let [status, setStatus] = useState(false);
//     let dispatch = useDispatch();

//     useEffect(() => {
//         getTask();
//     }, []);

//     async function getTask() {
//         let data = await taskDetails(id).catch(error => { return { error } });
//         if (data.error) {
//             setStatus(false);
//             return alert(data.error);
//         }

//         let tempForm = {
//             taskName: data.taskName,
//             taskDescription: data.taskDescription,
//             expectedStartDate: data.expectedStartDate,
//             expectedEndDate: data.expectedEndDate
//         };
//         setFormData(tempForm);
//     }

//     function handleChange(e) {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         let schema = yup.object({
//             taskName: yup.string(),
//             taskDescription: yup.string(),
//             expectedStartDate: yup.date().nullable(true),
//             expectedEndDate: yup.date().nullable(true)
//         });

//         let check = await validator(schema, formData).catch(error => { return { error } });
//         if (check.error) {
//             setStatus(false);
//             return setError(check.error);
//         }

//         let data = await editTask(id, formData).catch(error => { return { error } });
//         if (data.error) {
//             setStatus(false);
//             return setError(data.error);
//         }
//         dispatch(updateTask({ ...formData, id }));
//         setStatus(true);
//     }

//     return (
//         <div className="container mt-5">
//             {status && <div className="alert alert-success">Successfully Updated</div>}
//             {Array.isArray(error) && error.map((err, index) => (
//                 <div key={index} className="alert alert-danger">{err}</div>
//             ))}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Task Name:</label>
//                     <input
//                         type="text"
//                         name="taskName"
//                         value={formData.taskName}
//                         onChange={handleChange}
//                         placeholder="Task Name"
//                         className="form-control"
//                     />
//                     {error.taskName && <div className="text-danger">{error.taskName}</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Task Description:</label>
//                     <input
//                         type="text"
//                         name="taskDescription"
//                         value={formData.taskDescription}
//                         onChange={handleChange}
//                         placeholder="Task Description"
//                         className="form-control"
//                     />
//                     {error.taskDescription && <div className="text-danger">{error.taskDescription}</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Task Expected Start Date:</label>
//                     <input
//                         type="date"
//                         name="expectedStartDate"
//                         value={formData.expectedStartDate}
//                         onChange={handleChange}
//                         className="form-control"
//                     />
//                     {error.expectedStartDate && <div className="text-danger">{error.expectedStartDate}</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Task Expected End Date:</label>
//                     <input
//                         type="date"
//                         name="expectedEndDate"
//                         value={formData.expectedEndDate}
//                         onChange={handleChange}
//                         className="form-control"
//                     />
//                     {error.expectedEndDate && <div className="text-danger">{error.expectedEndDate}</div>}
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update</button>
//             </form>
//         </div>
//     );
// }

// export default TaskUpdate;