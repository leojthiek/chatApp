import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const sendFriendRequestAction = createAsyncThunk('friendship/send-request', async ({receiverId},{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response = await api.post("/friendship/request/send",{receiverId},config);
        const data = response.data.friendShip;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const sendFriendRequestReducer = createSlice({
    name: "sendFriendRequest",
    initialState: {
        friendship:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendFriendRequestAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(sendFriendRequestAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.friendship = action.payload;
            })
            .addCase(sendFriendRequestAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default sendFriendRequestReducer.reducer