import React from "react"
import { BsFillPersonDashFill } from "react-icons/bs";
import { BsFillPersonCheckFill } from "react-icons/bs";

export default function AllFriendRequestComponent() {
  return (
    <div className=' pt-6 flex gap-5 pl-4 pr-4'>
      <div className='md:w-14 md:h-12 w-9 h-9 cursor-pointer'>
        <img
          src='manager.jpg'
          alt='profile'
          className='w-full h-full rounded-full object-cover'
        />
      </div>
      <div className='flex justify-between w-full border-b items-center'>
        <h3 className=' font-normal'>Rokiemlo</h3>
        <div className=" flex gap-4 text-xl">
          <BsFillPersonCheckFill className=" cursor-pointer hover:bg-green-600 rounded-full"/>
          <BsFillPersonDashFill className=" cursor-pointer hover:bg-red-600 rounded-full"/>
        </div>
      </div>
    </div>
  )
}
