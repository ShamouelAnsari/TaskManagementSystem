import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    list: [],
    Loading: false,
    error: null
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.Loading = action.payload
        },
        setTask: (state, action) => {
            state.list = action.payload
            state.Loading = false
        },
        updateTask: (state, action) => {
            for (let i in state.list) {
                let obj = state.list[i];
                if (obj["id"] == action.payload.id) {
                    state.list[i] = action.payload
                }
            }
        },
        setError: (state, action) => {
            state.error = action.payload
            state.Loading = false
        },
        taskdelete: (state, action) =>{
            state.list = state.list.filter(task => task.id == action.payload)
        }
    }
})

export const { setLoading, setTask, updateTask, setError, taskdelete } = taskSlice.actions
export default taskSlice.reducer