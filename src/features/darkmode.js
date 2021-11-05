import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
    name : "darktoggle",
    initialState : {value : false},
    reducers : {
        toggleDarkMode : (state, action) => {
            state.value = action.payload;
        }
    }
});

export default darkModeSlice.reducer;
export const {toggleDarkMode} = darkModeSlice.actions;