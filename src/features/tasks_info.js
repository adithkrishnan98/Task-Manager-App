import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name : "tasks",
    initialState : {value : []},
    reducers : {
        setTasks : (state, action) => {
            state.value = action.payload;
        }
    }
});

export default taskSlice.reducer;
export const {setTasks, setTitle} = taskSlice.actions;