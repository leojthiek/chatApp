import React from 'react'

export default function RightHomeComponent() {
  return (
   <div className=' w-[100%] h-[100%]'>
     <div className=' flex flex-col justify-center w-full h-full items-center'>
       <div className=' w-2/4'>
         <img src='chat.png' alt='chat'/>
       </div>
       <div className=' text-center'>
        <h1 className='font-semibold text-3xl text-gray-500 pb-5'>Chat Web</h1>
        <p className=' font-normal  text-gray-500'>Connect with your friends and family</p>
        <p className=' font-normal  text-gray-500'>Receive message even when you are offline</p>
       </div>
     </div>
   </div>
  )
}
