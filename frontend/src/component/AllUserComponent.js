import React from "react"
import { IoPersonAddSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { getAllUserAction } from "../redux/features/getAllUserSlice"
import ErrorComponent from "./ErrorComponent"
import { BsPersonFillCheck } from "react-icons/bs"
import { sendFriendRequestAction } from "../redux/features/sendFriendRequestSlice"
import { MdOutlinePending } from "react-icons/md";

export default function AllUserComponent() {
  const dispatch = useDispatch()

  const getAllUser = useSelector((state) => state.getAllUser)
  const { users, error, loading } = getAllUser

  const sendFriendRequest = useSelector((state) => state.sendFriendRequest)
  const {
    friendship,
    error: friendshipError,
    loading: friendshipLoading,
  } = sendFriendRequest

  React.useEffect(() => {
    dispatch(getAllUserAction())
  }, [dispatch, friendship])

  const handleSendFriendRequest = (receiverId) => {
    dispatch(sendFriendRequestAction({ receiverId }))
  }
  return (
    <>
      {error && <ErrorComponent message={error} />}
      {friendshipError && <ErrorComponent message={friendshipError} />}

      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
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
                <h3 className=' font-normal capitalize'>{user.name}</h3>
                <div>
                  {user.friendshipStatus === "Accepted" ? (
                    <BsPersonFillCheck className='bg-green-300 rounded-md text-lg text-green-700' />
                  ) : user.friendshipStatus === "Pending" ? (
                    <MdOutlinePending className=" bg-blue-300 rounded-md text-blue-700"/>
                  ) : (
                    <IoPersonAddSharp
                      className='cursor-pointer text-lg'
                      onClick={() => handleSendFriendRequest(user._id)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}
