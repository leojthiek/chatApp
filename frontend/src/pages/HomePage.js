import React, { useState } from "react"
import RightHomeComponent from "../component/RightHomeComponent"
import LeftHomeComponent from "../component/LeftHomeCmponent"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const [menuListVisible, setMenuListVisible] = React.useState(false)
  const [userMessageVisible, setUserMessageVisible] = useState(false)

  // passing down friendId to use while getting messages in MessageComponent
  const [friendId, setFriendId] = React.useState("")

  const navigate = useNavigate()

  const loginUser = useSelector((state) => state.loginUser)
  const { user } = loginUser

  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className=' bg-gray-300 h-screen relative'>
      <div className=' bg-green-400 h-28 w-full relative hidden lg:block'></div>
      <div className='flex justify-center absolute top-0 w-full lg:h-[97%] h-[100%] pt-0 lg:pt-6'>
        <div className='lg:w-[90%] bg-gray-300 flex w-full'>
          <div className='lg:w-[30%] md:w-ful bg-white w-full border-r-gray-300 border'>
            <LeftHomeComponent
              menuListVisible={menuListVisible}
              setMenuListVisible={setMenuListVisible}
              setUserMessageVisible={setUserMessageVisible}
              setFriendId={setFriendId}
            />
          </div>

          <div className='lg:w-[70%] lg:block md:hidden hidden bg-gray-200'>
            <RightHomeComponent userMessageVisible={userMessageVisible} friendId={friendId}/>
          </div>
        </div>
      </div>
    </div>
  )
}
