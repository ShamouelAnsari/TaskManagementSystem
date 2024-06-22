import { useSelector, useDispatch } from "react-redux";
import { deleteTask, taskDetails, taskList } from "../services/taskServices";
import { useEffect } from "react";
import { setLoading, setTask, setError, taskdelete } from "../store/taskSlice";
import { useNavigate } from "react-router-dom";

function TaskList() {
    let list = useSelector(state => { return state.task.list })
    let Loading = useSelector(state => { return state.task.Loading })
    let error = useSelector(state => { return state.task.error })
    let dispatch = useDispatch();
    let navigate = useNavigate()

    useEffect(() => {
        getList();
    }, [])

    async function getList() {
        dispatch(setLoading(true))
        let data = await taskList().catch(error => { return { error } })
        if (data.error) {
            return dispatch(setError('No Task Has Been Created From This User / Failed To Fetch Data'))
        }
        dispatch(setLoading(false))
        dispatch(setTask(data.data))
    }

    function handleDetails(task) {
        navigate(`/detailTask/${task.id}`)
    }

    async function handleRemove(task) {
        let data = await deleteTask(task.id).catch((error) => { return { error } })
        if (data.error){
            return dispatch(setError('Failed To Delete Data'))
        }
        dispatch(setLoading(false))
        dispatch(taskdelete(task.id))
    }

    function handleUpdate(task) {
        navigate(`/updateTask/${task.id}`)
    }

    return (
        <div className="taskList">
            {!error && Loading && <div>Loading...</div>}
            {!Loading && error && <div>{error}</div>}
            {
                (list && !Loading && !error) && list.map((item, index) => {
                    return (
                        <div key={index}>
                            <h4>
                                {item.taskName}
                                <span onClick={() => { handleUpdate(item) }} className="updateBtn">Update</span>
                                <span onClick={() => { handleDetails(item) }} className="detailsBtn"> Details </span>
                                <span onClick={() => { handleRemove(item) }} className="removeBtn"> Remove </span>
                            </h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TaskList;

// import { useSelector, useDispatch } from "react-redux";
// import { deleteTask, taskList } from "../services/taskServices";
// import { useEffect } from "react";
// import { setLoading, setTask, setError, taskdelete } from "../store/taskSlice";
// import { useNavigate } from "react-router-dom";

// function TaskList() {
//     let list = useSelector(state => state.task.list);
//     let Loading = useSelector(state => state.task.Loading);
//     let error = useSelector(state => state.task.error);
//     let dispatch = useDispatch();
//     let navigate = useNavigate();

//     useEffect(() => {
//         getList();
//     }, []);

//     async function getList() {
//         dispatch(setLoading(true));
//         let data = await taskList().catch(error => { return { error } });
//         if (data.error) {
//             return dispatch(setError('Failed To Fetch Data'));
//         }
//         dispatch(setLoading(false));
//         dispatch(setTask(data.data));
//     }

//     function handleDetails(task) {
//         navigate(`/detailTask/${task.id}`);
//     }

//     async function handleRemove(task) {
//         let data = await deleteTask(task.id).catch(error => { return { error } });
//         if (data.error) {
//             return dispatch(setError('Failed To Delete Data'));
//         }
//         dispatch(setLoading(false));
//         dispatch(taskdelete(task.id));
//     }

//     function handleUpdate(task) {
//         navigate(`/updateTask/${task.id}`);
//     }

//     return (
//         <div className="container">
//             {Loading && !error && <div className="alert alert-info">Loading...</div>}
//             {error && !Loading && <div className="alert alert-danger">{error}</div>}
//             {list && !Loading && !error && (
//                 <div className="list-group">
//                     {list.map((item, index) => (
//                         <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                             <h5 className="mb-1">{item.taskName}</h5>
//                             <div>
//                                 <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdate(item)}>
//                                     Update
//                                 </button>
//                                 <button className="btn btn-secondary btn-sm me-2" onClick={() => handleDetails(item)}>
//                                     Details
//                                 </button>
//                                 <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item)}>
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default TaskList;