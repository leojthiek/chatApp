import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../API/api"


export const loginAction = createAsyncThunk('user/login', async ({email, password},{ rejectWithValue }) => {
    try {
        const response = await api.post("/user/login", { email, password });
        const user = response.data.user;

        localStorage.setItem('chatapp_user', JSON.stringify(user))
        return user;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
});

const userFromLocalStorage = localStorage.getItem('chatapp_user')

const initialState = {
   user : userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
   error: null,
   loading:false
}

const loginUserReducer = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        logout: (state)=>{
            state.user = null
            localStorage.removeItem('chatapp_user')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.user = action.payload;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default loginUserReducer.reducer
export const {logout} = loginUserReducer.actions