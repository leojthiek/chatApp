import React from "react"
import { IoHome } from "react-icons/io5"
import { MdGroupAdd } from "react-icons/md"
import { LuMessageSquarePlus } from "react-icons/lu"
import { FaUserFriends } from "react-icons/fa"
import { CiMenuKebab } from "react-icons/ci"
import { IoSearch } from "react-icons/io5"
import { FaArrowLeft } from "react-icons/fa6"
import AllUserComponent from "./AllUserComponent"
import AllFriendComponent from "./AllFriendsComponent"
import AllFriendRequestComponent from "./AllFriendRequestComponent"

export default function LeftHomeCmponent({menuListVisible,setMenuListVisible}) {
  const [isAllUservisible, setIsAllUserVisible] = React.useState(false)
  const [homeVisiblity, setHomeVisibility] = React.useState(true)
  const [allFriendvisible, setAllFriendVisible] = React.useState(false)
  const [friendRequestVisible, setFriendRequestVisible] = React.useState(false)

  const handleHomeIcon = () => {
    setHomeVisibility(true)
    setIsAllUserVisible(false)
    setAllFriendVisible(false)
    setFriendRequestVisible(false)
  }

  const handleAllUserVisibility = () => {
    setIsAllUserVisible(true)
    setHomeVisibility(false)
    setAllFriendVisible(false)
    setFriendRequestVisible(false)
  }

  const handleAllFriedsVisible = () => {
    setAllFriendVisible(true)
    setHomeVisibility(false)
    setIsAllUserVisible(false)
    setFriendRequestVisible(false)
  }

  const handleFriendRequestVisible = () => {
    setFriendRequestVisible(true)
    setAllFriendVisible(false)
    setHomeVisibility(false)
    setIsAllUserVisible(false)
  }

  const handleOpenMenu = () => {
    setMenuListVisible(!menuListVisible)
  }


  return (
    <>
      <div className=' flex justify-between items-center md:h-16 h-12 bg-gray-200 pl-4 pr-4'>
        <div className='md:w-12 md:h-12 w-9 h-9'>
          <img
            src='manager.jpg'
            alt='profile'
            className='w-full h-full rounded-full object-cover'
          />
        </div>
        <div className=' flex md:gap-7 gap-5 align-middle relative'>
          <IoHome
            onClick={handleHomeIcon}
            className=' md:text-2xl text-xl cursor-pointer'
          />
          <MdGroupAdd
            onClick={handleAllUserVisibility}
            className=' md:text-2xl text-xl cursor-pointer'
          />
          <FaUserFriends
            onClick={handleFriendRequestVisible}
            className=' md:text-2xl text-xl cursor-pointer'
          />
          <LuMessageSquarePlus
            onClick={handleAllFriedsVisible}
            className=' md:text-2xl text-xl cursor-pointer'
          />
          <CiMenuKebab onClick={handleOpenMenu} className=' md:text-2xl text-xl cursor-pointer' />
          {menuListVisible && (
            <div className="absolute top-full left-0 w-56 bg-white mt-3 pt-2 pb-4 rounded shadow z-10">
              <h3 className=" cursor-pointer h-10 hover:bg-gray-200 flex items-center pl-3">Profile</h3>
              <h3 className=" cursor-pointer h-10 hover:bg-gray-200 flex items-center pl-3">Logout</h3>
            </div>
          )}
        </div>
       
      </div>

      <div className='relative flex justify-center pt-2'>
        <IoSearch className='absolute left-11 lg:left-9 md:left-16 top-[39%]' />
        <input
          type='text'
          placeholder='Search or start new chat'
          className='pl-12 md:pl-16 pr-4 py-2 border w-[90%] bg-gray-200 rounded-2xl'
        />
      </div>

      {homeVisiblity && (
        <div className=' pt-6 flex gap-5 pl-4 pr-4'>
          <div className='md:w-14 md:h-12 w-9 h-9 cursor-pointer'>
            <img
              src='manager.jpg'
              alt='profile'
              className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div className='flex justify-between w-full border-b cursor-pointer'>
            <div className=' pb-3'>
              <h3 className=' font-normal'>Rokiemlo</h3>
              <p className=' text-gray-600 text-sm font-normal'>
                The name of our school is PMS english school.
              </p>
            </div>
            <div>
              <p className=' text-sm font-semibold text-gray-500'>Yesterday</p>
            </div>
          </div>
        </div>
      )}
      <div>{isAllUservisible && <AllUserComponent />}</div>
      <div>{allFriendvisible && <AllFriendComponent />}</div>
      <div>{friendRequestVisible && <AllFriendRequestComponent />}</div>
      
    </>
  )
}
