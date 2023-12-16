import React from "react"
import { BsFillPersonDashFill } from "react-icons/bs"
import { BsFillPersonCheckFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { getAllFriendRequestAction } from "../redux/features/getAllFriendRequest"
import { rejectFriendAction } from "../redux/features/rejectFriendRequestSlice"
import { acceptFriendRequestAction } from "../redux/features/acceptFriendRequestSlice"
import ErrorComponent from "./ErrorComponent"

export default function AllFriendRequestComponent() {

  const [isFriendRequestAvailable,setIsFriendRequestAvailable] = React.useState("")

  const dispatch = useDispatch()

  const getAllFriendRequest = useSelector((state) => state.getAllFriendRequest)
  const { users, error, loading } = getAllFriendRequest




  const acceptFriendRequest = useSelector((state)=> state.acceptFriendRequest)
  const {friend,error:acceptError,loading:acceptLoading} = acceptFriendRequest

  const rejectFriendRequest = useSelector((state)=> state.rejectFriendRequest)
  const {deleteFriend,error:rejectError,loading:rejectLoading} = rejectFriendRequest

  React.useEffect(()=>{
    dispatch(getAllFriendRequestAction())
  },[dispatch])

  React.useEffect(()=>{
    if(users.length === 0){
      setIsFriendRequestAvailable("No Friend request")
    }else{
      setIsFriendRequestAvailable("")
    }
   },[users])

  const handleRejectRequest = (senderId) => {
     dispatch(rejectFriendAction({senderId}))
     dispatch(getAllFriendRequestAction())
  }

  const handleAcceptRequest = (senderId) => {
    dispatch(acceptFriendRequestAction({senderId}))
    dispatch(getAllFriendRequestAction())

  }
  return (
    <>
    {error && <ErrorComponent message={error}/>}
    {acceptError && !friend && <ErrorComponent message={acceptError}/>}
    {rejectError && !deleteFriend && <ErrorComponent message={rejectError}/>}
    {isFriendRequestAvailable && (
      <div className=" mt-4">
      <ErrorComponent message={isFriendRequestAvailable}/>
      </div>
    )}

      {users.map((user) => (
        <div className=' pt-6 flex gap-5 pl-4 pr-4' key={user._id}>
          <div className='md:w-14 md:h-12 w-9 h-9 cursor-pointer'>
            <img
              src='manager.jpg'
              alt='profile'
              className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div className='flex justify-between w-full border-b items-center'>
            <h3 className=' font-normal'>{user.name}</h3>
            <div className=' flex gap-4 text-xl'>
              <BsFillPersonCheckFill className=' cursor-pointer hover:bg-green-600 rounded-full' onClick={()=> handleAcceptRequest(user._id)} />
              <BsFillPersonDashFill className=' cursor-pointer hover:bg-red-600 rounded-full' onClick={()=> handleRejectRequest(user._id)}/>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
