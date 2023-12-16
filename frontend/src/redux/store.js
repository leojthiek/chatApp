import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./features/registerSlice"
import loginUserReducer from "./features/loginSlice"
import getAllUserReducer from "./features/getAllUserSlice"
import sendFriendRequestReducer from "./features/sendFriendRequestSlice"
import getAllFriendRequestReducer from "./features/getAllFriendRequest"
import getAllFriendsReducer from "./features/getFriendsSlice"
import rejectFriendRequestReducer from "./features/rejectFriendRequestSlice"
import acceptFriendRequestReducer from "./features/acceptFriendRequestSlice"
import getMessagesReducer from "./features/getMessagesSlice"
import sendMessageReducer from "./features/sendMessageSlice"

const store = configureStore({
  reducer: {
    register: registerReducer,
    loginUser: loginUserReducer,
    getAllUser: getAllUserReducer,
    sendFriendRequest: sendFriendRequestReducer,
    getAllFriendRequest: getAllFriendRequestReducer,
    getAllFriends:getAllFriendsReducer,
    rejectFriendRequest:rejectFriendRequestReducer,
    acceptFriendRequest:acceptFriendRequestReducer,
    getMessages:getMessagesReducer,
    sendMessage:sendMessageReducer
  },
})

export default store
