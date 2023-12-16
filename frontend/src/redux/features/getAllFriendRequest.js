import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const getAllFriendRequestAction = createAsyncThunk('friendship/request/pending', async (_,{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response = await api.get("/friendship/request/pending",config);
        const users = response.data.extractSenderDetail;
        return users;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const getAllFriendRequestReducer = createSlice({
    name: "request_pending",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFriendRequestAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getAllFriendRequestAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.users = action.payload;
            })
            .addCase(getAllFriendRequestAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default getAllFriendRequestReducer.reducer