import React, { useState, useRef, useEffect } from "react"
import { CiMenuKebab } from "react-icons/ci"
import { useDispatch, useSelector } from "react-redux"
import { getMessagesAction } from "../redux/features/getMessagesSlice"
import { sendMessageAction } from "../redux/features/sendMessageSlice"
import io from "socket.io-client"

const socket = io("http://localhost:4001")

export default function MessagesComponent({ friendId }) {
  const [chatMenuListVisible, setChatMenuListVisible] = useState(false)
  const [content, setContent] = React.useState("")

  const dispatch = useDispatch()

  const getMessages = useSelector((state) => state.getMessages)
  const { messages, loading } = getMessages

  const loginUser = useSelector((state) => state.loginUser)
  const { user } = loginUser

  const chatContainerRef = useRef(null)
  const inputRef = useRef(null)

  const handleOpenChatMenu = () => {
    setChatMenuListVisible(!chatMenuListVisible)
  }

  React.useEffect(() => {
    if (friendId) {
      dispatch(getMessagesAction({ friendId }))
    }
  }, [dispatch, friendId])

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    const receiverId = friendId
    dispatch(sendMessageAction({ receiverId, content }))

    socket.emit("sendMessage", { content, senderId: user.id, receiverId })
    setContent("")
  }

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data) {
        dispatch(getMessagesAction({ friendId }))
      } else {
        console.error("Invalid data received for receiveMessage event:", data)
      }
    }

    socket.on("receiveMessage", handleReceiveMessage)

    return () => {
      socket.off("receiveMessage", handleReceiveMessage)
    }
  }, [dispatch, friendId])

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [messages])

  return (
    <div className='flex flex-col h-full relative'>
      <div className='flex justify-between items-center md:h-16 h-12 bg-white border-b px-4 relative'>
        <div className='flex items-center'>
          <div className='w-10 h-10 overflow-hidden rounded-full'>
            <img
              src='manager.jpg'
              alt='profile'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='ml-2'>
            <h1 className='text-lg font-normal pl-3'>Username</h1>
          </div>
        </div>
        <div>
          <CiMenuKebab
            onClick={handleOpenChatMenu}
            className='md:text-2xl text-xl cursor-pointer'
          />
          {chatMenuListVisible && (
            <div className='absolute top-0 right-0 w-56 bg-white mt-16 pt-2 pb-4 rounded shadow z-10'>
              <h3 className='cursor-pointer h-10 hover:bg-gray-200 flex items-center pl-3'>
                Close chat
              </h3>
              <h3 className='cursor-pointer h-10 hover:bg-gray-200 flex items-center pl-3'>
                View profile
              </h3>
            </div>
          )}
        </div>
      </div>
      <div
        className='flex-1 overflow-y-auto pl-6 pr-6 mb-20 mt-4'
        ref={chatContainerRef}
      >
        {loading && <p>Loading...</p>}
        {user && messages && messages.length > 0? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`mb-2 ${
                message.senderId === (user.id || null)
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <div
                className={`rounded-lg p-3 ${
                  message.senderId === (user.id || null)
                    ? "bg-green-200 text-black inline-block max-w-[80%] text-left"
                    : "bg-white text-black inline-block max-w-[80%]"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        ) : (
          <div className=' flex justify-center items-center h-[100%]'>
            <p className=' text-xl'>Send "Hi!" to start a conversation</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmitMessage} className='flex absolute bottom-0 left-0 right-0 bg-white p-4 border-t ml-3 mr-3'>
        <input
          type='text'
          placeholder='Type a message...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='flex-1 py-2 px-4 rounded-full border outline-none w-full'
          ref={inputRef}
        />
        <button
          className='ml-4 bg-green-500 text-white py-2 px-4 rounded-full'
          type="submit"
          onClick={() => {
            inputRef.current.focus()
          }}
        >
          Send
        </button>
      </form>
    </div>
  )
}
