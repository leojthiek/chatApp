import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const rejectFriendAction = createAsyncThunk('friendship/reject', async ({senderId},{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response = await api.delete("/friendship/request/reject",{...config,data:{senderId}});
        const data = response.data.deleteFriendship;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const rejectFriendRequestReducer = createSlice({
    name: "rejectFriend",
    initialState: {
        deleteFriendship:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rejectFriendAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(rejectFriendAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.deleteFriendship = action.payload;
            })
            .addCase(rejectFriendAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default rejectFriendRequestReducer.reducer