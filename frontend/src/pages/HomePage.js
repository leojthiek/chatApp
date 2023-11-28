import React from "react"
import RightHomeComponent from "../component/RightHomeComponent"
import LeftHomeComponent from "../component/LeftHomeCmponent"

export default function HomePage() {
  const [menuListVisible,setMenuListVisible]= React.useState(false)


  return (
    <div className=' bg-gray-300 h-screen relative'>
      <div className=' bg-green-400 h-28 w-full relative hidden lg:block'></div>
      <div className="flex justify-center absolute top-0 w-full lg:h-[97%] h-[100%] pt-0 lg:pt-6">
        <div className='lg:w-[90%] bg-gray-300 flex w-full'>
          <div className='lg:w-[30%] md:w-ful bg-white w-full border-r-gray-300 border'>
            <LeftHomeComponent  menuListVisible={menuListVisible} setMenuListVisible={setMenuListVisible}/>
          </div>

          <div className='lg:w-[70%] lg:block md:hidden hidden bg-gray-200'>
            <RightHomeComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
