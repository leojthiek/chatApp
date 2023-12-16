import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const getMessagesAction = createAsyncThunk('message/userMessage', async ({friendId},{rejectWithValue,getState}) => {
    try {
        const token = getState().loginUser.user?.token;
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await api.get(`/message/private/messages?friendId=${friendId}`,config);
        const messages = response.data.messages || [];
        return messages;
    } catch (error) {
        return rejectWithValue(error.response.data.error || error.response.data.message);
    }
});



const getMessagesReducer = createSlice({
    name: "usersMessages",
    initialState: {
        messages: undefined,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getMessagesAction.fulfilled, (state, action) => {
                
                state.loading = false;
                state.error = null
                state.messages = action.payload;
            })
            .addCase(getMessagesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default getMessagesReducer.reducer