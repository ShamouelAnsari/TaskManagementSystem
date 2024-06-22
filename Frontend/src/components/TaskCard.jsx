import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { taskDetails } from '../services/taskServices'

function TaskCard() {
    let { id } = useParams()
    const [taskData, setTaskData] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        getTask()
    }, [])

    async function getTask() {
        let data = await taskDetails(id).catch(error => { return { error } })
        if (data.error) {
            return setError("Task Not Found")
        }
        console.log(data);
        setTaskData(data)
    }

    return (
        <table className='table table-bordered table-hover table-striped'>
            <tbody>
                <tr className='ListTaskTable'>
                    {error && <tr><td>{error}</td></tr>}
                    {(!error && taskData) && Object.keys(taskData).map((key, index) => {
                        return (
                            <tr key={index}>
                                <td>{key}</td>
                                <td>{taskData[key]}</td>
                            </tr>
                        )
                    })
                }
                </tr>
            </tbody>
        </table>
    )
}

export default TaskCard



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { taskDetails } from '../services/taskServices';

// function TaskCard() {
//     let { id } = useParams();
//     const [taskData, setTaskData] = useState({});
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         getTask();
//     }, []);

//     async function getTask() {
//         let data = await taskDetails(id).catch(error => { return { error } });
//         if (data.error) {
//             return setError("Task Not Found");
//         }
//         console.log(data);
//         setTaskData(data);
//     }

//     return (
//         <div className="container mt-5">
//             {error ? (
//                 <div className="alert alert-danger">{error}</div>
//             ) : (
//                 <table className='table table-bordered table-hover table-striped'>
//                     <tbody>
//                         {Object.keys(taskData).map((key, index) => (
//                             <tr key={index}>
//                                 <td className="fw-bold">{key}</td>
//                                 <td>{taskData[key]}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default TaskCard;