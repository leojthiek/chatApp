import React from 'react'
import {Link} from "react-router-dom"

export default function LoginPage() {
  return (
    <div className=' bg-gray-600 w-screen h-screen flex justify-center items-center'>
      <div className=' bg-white pb-9 lg:w-1/4 rounded-xl pl-8 pr-8'>
        <h1 className=' pt-9 text-3xl font-semibold text-gray-500 pb-9'>SIGN UP</h1>
        <form>
           
            <div className=' pb-5'>
                <p className=' font-medium text-xl text-gray-500 pb-2'>Email</p>
                <input type='text' className=' border-2 border-gray-700 w-full h-9 '/>
            </div>
            <div className=' pb-5'>
                <p className=' font-medium text-xl text-gray-500 pb-2'>Password</p>
                <input type='password' className=' border-2 border-gray-700 w-full h-9'/>
            </div>
            <div>
                <button className=' w-full bg-pink-500 hover:bg-pink-400 h-9 rounded-lg text-lg text-white font-normal'>SUBMIT</button>
            </div>
        </form>
        <p className=' pt-5'>Already a user ? <Link to={"/register"} className=' text-red-600'>Sign Up</Link> </p>
      </div>
    </div>
  )
}
