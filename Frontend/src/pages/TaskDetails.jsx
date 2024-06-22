import React from 'react'
import TaskCard from '../components/TaskCard';
import CommentList from '../components/CommentList';
import CommentAdd from '../components/CommentAdd';
import AssignTask from '../components/AssignTask';

function TaskDetails() {
    return (
        <>
            <h1>Task Details</h1>
            <TaskCard />
            <CommentList/>
            <CommentAdd/>
            <AssignTask/>
        </>
    )
}

export default TaskDetails;