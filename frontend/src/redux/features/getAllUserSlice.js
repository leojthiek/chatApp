import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const getAllUserAction = createAsyncThunk('user/allUser', async (_,{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response = await api.get("/user/all-users",config);
        const users = response.data.users;
        return users;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const getAllUserReducer = createSlice({
    name: "allUsers",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getAllUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.users = action.payload;
            })
            .addCase(getAllUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default getAllUserReducer.reducer