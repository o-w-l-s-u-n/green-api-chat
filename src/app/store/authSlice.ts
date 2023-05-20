import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface stateIntf {
    idInput: string;
    tokenInput: string;
}

const initialState: stateIntf = {
    idInput: '',
    tokenInput: ''
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeIdInput: (state, action) => {
            state.idInput = action.payload;
        },
        changeTokenInput: (state, action) => {
            state.tokenInput = action.payload;
        }
    },
});

export const { changeIdInput, changeTokenInput } = authSlice.actions;
export const selectIdInput = (state: RootState) => state.auth.idInput;
export const selectTokenInput = (state: RootState) => state.auth.tokenInput;
 
export default authSlice.reducer;