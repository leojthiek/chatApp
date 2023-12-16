import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFriendsAction } from "../redux/features/getFriendsSlice"
import { Link } from "react-router-dom"

export default function AllFriendComponent({ handleAllUserVisibility ,setUserMessageVisible,setFriendId}) {
  const [isFriendsAvailable, setIsfriendsAvailable] = React.useState("")
  const dispatch = useDispatch()

  const getAllFriends = useSelector((state) => state.getAllFriends)
  const { friends, error, loading } = getAllFriends

  React.useEffect(() => {
    dispatch(getAllFriendsAction())
  }, [dispatch])

  React.useEffect(() => {
    if (friends.length === 0) {
      setIsfriendsAvailable(true)
    } else {
      setIsfriendsAvailable(false)
    }
  }, [friends])

  const handleShowUserMessage = (friendId) => {
    setUserMessageVisible(true)
    setFriendId(friendId)
  }
  return (
    <>
      {isFriendsAvailable && (
        <div className=' flex justify-center pt-6'>
          <div className=" flex flex-col gap-2">
            <p className=" lg:text-lg font-semibold">No friends just yet, Start adding some</p>
            <button className=" bg-blue-300 pt-1 pb-1 rounded-md" onClick={() => handleAllUserVisibility()}>
              Find Friends
            </button>
          </div>
        </div>
      )}
      {friends &&
        friends.map((friend) => (
          <div
            className=' mt-6 flex gap-5 pl-4 pr-4  hover:bg-gray-100'
            key={friend._id}
          >
            <div className='md:w-14 md:h-12 w-9 h-9 cursor-pointer'>
              <img
                src='manager.jpg'
                alt='profile'
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <div className='flex justify-between w-full border-b items-center cursor-pointer' onClick={()=> handleShowUserMessage(friend._id)}>
              <h3 className=' font-normal'>{friend.name}</h3>
            </div>
          </div>
        ))}
    </>
  )
}
