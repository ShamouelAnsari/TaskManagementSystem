import TaskList from "../components/TaskList";
import TaskSearch from "../components/TaskSearch";
import { Link } from "react-router-dom";

function Task() {
    return (
        <>
            <div className="taskMainPage">
                <h3>Task Page</h3>
                <div className="taskActions">
                    <TaskSearch />
                    <button className="btn btn-primary">
                        <Link to="/createTask">Add Task</Link>
                    </button>
                </div>
                <TaskList />
            </div>
        </>
    )
}

export default Task;

// import TaskList from "../components/TaskList";
// import TaskSearch from "../components/TaskSearch";
// import { Link } from "react-router-dom";

// function Task() {
//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-12">
//                     <h2 className="text-center mb-4">
//                         ~~ WELCOME TO TASK PAGE ~~
//                     </h2>
//                     <div className="d-flex justify-content-between mb-3">
//                         <Link to="/createTask" className="btn btn-primary">Add Task</Link>
//                         <TaskSearch />
//                     </div>
//                     <TaskList />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Task;