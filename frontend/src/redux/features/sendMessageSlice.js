import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const sendMessageAction = createAsyncThunk('message/send', async ({receiverId,content},{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response = await api.post(`/message/private/send?receiverId=${receiverId}`,{content},config);
        const data = response.data.message;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});



const sendMessageReducer = createSlice({
    name: "sendFriendRequest",
    initialState: {
        message:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(sendMessageAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.message = action.payload;
            })
            .addCase(sendMessageAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default sendMessageReducer.reducer