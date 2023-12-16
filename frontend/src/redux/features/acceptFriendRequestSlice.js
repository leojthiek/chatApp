import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const acceptFriendRequestAction = createAsyncThunk('friendship/accept', async ({senderId},{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response = await api.put("/friendship/request/accept",{senderId},config);
        const data = response.data.friendShip;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const acceptFriendRequestReducer = createSlice({
    name: "acceptFriend",
    initialState: {
        friend:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(acceptFriendRequestAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(acceptFriendRequestAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.friend = action.payload;
            })
            .addCase(acceptFriendRequestAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default acceptFriendRequestReducer.reducer