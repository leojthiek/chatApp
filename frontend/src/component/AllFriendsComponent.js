import React from "react"


export default function AllFriendComponent() {
  return (
    <div className=' mt-6 flex gap-5 pl-4 pr-4  hover:bg-gray-100'>
      <div className='md:w-14 md:h-12 w-9 h-9 cursor-pointer'>
        <img
          src='manager.jpg'
          alt='profile'
          className='w-full h-full rounded-full object-cover'
        />
      </div>
      <div className='flex justify-between w-full border-b items-center cursor-pointer'>
        <h3 className=' font-normal'>Rokiemlo</h3>
      </div>
    </div>
  )
}
