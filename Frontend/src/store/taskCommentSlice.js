import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

let taskCommentSlice = createSlice({
    name: "taskComment",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload
        },
        addTaskComment: (state, action) => {
            state.list.push(action.payload)
        }
    }
})

export const { setList, addTaskComment } = taskCommentSlice.actions
export default taskCommentSlice.reducer