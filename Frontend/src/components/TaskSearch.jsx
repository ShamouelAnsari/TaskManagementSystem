import React from 'react'
import { useState } from 'react'
import { taskList } from "../services/taskServices"
import { useDispatch } from 'react-redux';
import { setLoading, setTask, setError } from '../store/taskSlice';

function TaskSearch() {
    let [search, setSearch] = useState("");
    let dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(setLoading(true))
        let data = await taskList(search).catch(error => { return { error } })
        if (data.error) {
            return dispatch(setError('Failed To Fetch Data'))
        }
        dispatch(setLoading(false))
        dispatch(setTask(data.data))

    }

    function handleChange(e) {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className='taskSearch'>
                <form onSubmit={handleSubmit} className='taskSearchForm'>
                    <input type='text' name='search' onChange={handleChange} placeholder='Search Tasks' />
                    <input className='btn btn-success' type='submit' value="Search" />
                </form>
            </div>
        </>
    )
}

export default TaskSearch


// import React from 'react';
// import { useState } from 'react';
// import { taskList } from "../services/taskServices";
// import { useDispatch } from 'react-redux';
// import { setLoading, setTask, setError } from '../store/taskSlice';

// function TaskSearch() {
//     let [search, setSearch] = useState("");
//     let dispatch = useDispatch();

//     async function handleSubmit(e) {
//         e.preventDefault();
//         dispatch(setLoading(true));
//         let data = await taskList(search).catch(error => { return { error } });
//         if (data.error) {
//             dispatch(setLoading(false));
//             return dispatch(setError('Failed To Fetch Data'));
//         }
//         dispatch(setLoading(false));
//         dispatch(setTask(data.data));
//     }

//     function handleChange(e) {
//         setSearch(e.target.value);
//     }

//     return (
//         <form onSubmit={handleSubmit} className="d-flex">
//             <input
//                 type='text'
//                 name='search'
//                 onChange={handleChange}
//                 placeholder='Search Tasks'
//                 className="form-control me-2"
//             />
//             <button type='submit' className="btn btn-outline-primary">Search</button>
//         </form>
//     );
// }

// export default TaskSearch;