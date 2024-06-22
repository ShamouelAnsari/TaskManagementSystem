import React, { useState } from 'react'
import * as yup from "yup"
import { validator } from '../utilities/projects'
import { addTask } from '../services/taskServices'
import { useNavigate } from 'react-router-dom'

function TaskAdd() {
  let initialVal = { taskName: "", taskDescription: "" }
  let [formData, setFormData] = useState(initialVal)
  let [error, setError] = useState({})
  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    let schema = yup.object({
      taskName: yup.string().required(),
      taskDescription: yup.string().required(),
      expectedStartDate: yup.date().nullable(true),
      expectedEndDate: yup.date().nullable(true)
    })

    let check = await validator(schema, formData).catch(error => { return { error } })
    console.log("Check data: ", check);
    if (check.error) {
      return setError(check.error)
    }

    let data = await addTask(formData).catch(error => { return { error } })
    console.log("Task Add Data: ", data);
    if (data.error) {
      return setError(data.error)
    }
    navigate('/detailTask/' + data.id)
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // function handleChange(e) {
  //   let tempData = {...formData}
  //   tempData[e.target.name] = e.target.value
  //   setFormData(tempData)
  // }

  return (
    <>
      <h1>This is Task ADD Page</h1>
      {
        Array.isArray(error) && error.map((error, index) => {
          return <p key={index}>{error.message}</p>
        })
      }
      <form onSubmit={handleSubmit} className='addTaskForm'>
        <div className='addTaskInput'>
          <label>Task Name: </label>
          <input type="text" name="taskName" value={formData.taskName} placeholder="Task Name" onChange={handleChange} />
          {error.taskName && <p>{error.taskName}</p>}

          <label>Task Description: </label>
          <input type="text" name="taskDescription" value={formData.taskDescription} placeholder="Task Description" onChange={handleChange} />
          {error.taskDescription && <p>{error.taskDescription}</p>}

          <label>Task Expected Start Date: </label>
          <input type="date" name="expectedStartDate" value={formData.expectedStartDate} placeholder="Task expectedStartDate" onChange={handleChange} />
          {error.expectedStartDate && <p>{error.expectedStartDate}</p>}

          <label>Task Expected End Date: </label>
          <input type="date" name="expectedEndDate" value={formData.expectedEndDate} placeholder="Task expectedEndDate" onChange={handleChange} />
          {error.expectedEndDate && <p>{error.expectedEndDate}</p>}
          <button type='submit' className='btn btn-success'>Add Task</button>
        </div>
      </form>
    </>
  )
}

export default TaskAdd;

// import React, { useState } from 'react'
// import * as yup from "yup"
// import { validator } from '../utilities/projects'
// import { addTask } from '../services/taskServices'
// import { useNavigate } from 'react-router-dom'

// function TaskAdd() {
//   let initialVal = { taskName: "", taskDescription: "" }
//   let [formData, setFormData] = useState(initialVal)
//   let [error, setError] = useState({})
//   let navigate = useNavigate()

//   async function handleSubmit(e) {
//     e.preventDefault()
//     let schema = yup.object({
//       taskName: yup.string().required(),
//       taskDescription: yup.string().required(),
//       expectedStartDate: yup.date().nullable(true),
//       expectedEndDate: yup.date().nullable(true)
//     })

//     let check = await validator(schema, formData).catch(error => { return { error } })
//     console.log("Check data: ", check);
//     if (check.error) {
//       return setError(check.error)
//     }

//     let data = await addTask(formData).catch(error => { return { error } })
//     console.log("Task Add Data: ", data);
//     if (data.error) {
//       return setError(data.error)
//     }
//     navigate('/detailTask/' + data.id)
//   }

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   return (
//     <div className="taskAddPage">
//       <h1>Add Task</h1>
//       {
//         Array.isArray(error) && error.map((error, index) => {
//           return <p key={index}>{error.message}</p>
//         })
//       }
//       <form onSubmit={handleSubmit} className='addTaskForm'>
//         <div className='addTaskInput'>
//           <label>Task Name: </label>
//           <input type="text" name="taskName" value={formData.taskName} placeholder="Task Name" onChange={handleChange} />
//           {error.taskName && <p>{error.taskName}</p>}

//           <label>Task Description: </label>
//           <input type="text" name="taskDescription" value={formData.taskDescription} placeholder="Task Description" onChange={handleChange} />
//           {error.taskDescription && <p>{error.taskDescription}</p>}

//           <label>Task Expected Start Date: </label>
//           <input type="date" name="expectedStartDate" value={formData.expectedStartDate} placeholder="Task expectedStartDate" onChange={handleChange} />
//           {error.expectedStartDate && <p>{error.expectedStartDate}</p>}

//           <label>Task Expected End Date: </label>
//           <input type="date" name="expectedEndDate" value={formData.expectedEndDate} placeholder="Task expectedEndDate" onChange={handleChange} />
//           {error.expectedEndDate && <p>{error.expectedEndDate}</p>}
//           <button type='submit' className='btn btn-success'>Add Task</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default TaskAdd;