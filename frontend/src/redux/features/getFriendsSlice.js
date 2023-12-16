import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const getAllFriendsAction = createAsyncThunk('friendship/friends', async (_,{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response = await api.get("/friendship/all-friends",config);
        const friends = response.data.friends;
        return friends;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const getAllFriendsReducer = createSlice({
    name: "allFriends",
    initialState: {
        friends:[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFriendsAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getAllFriendsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.friends = action.payload;
            })
            .addCase(getAllFriendsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default getAllFriendsReducer.reducer