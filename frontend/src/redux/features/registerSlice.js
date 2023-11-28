import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const registerAction = createAsyncThunk('user/register', async ({name, email, password},{ rejectWithValue }) => {
    try {
        const response = await api.post("/user/register", { name, email, password });
        const user = response.data.user;
        return user;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const registerReducer = createSlice({
    name: "registerUser",
    initialState: {
        registerUser: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.registerUser = action.payload;
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default registerReducer.reducer