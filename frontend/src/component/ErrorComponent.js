import React from "react"

export default function ErrorComponent({ message }) {
  return (
    <div className=' bg-red-200 text-center pt-1 pb-1'>
      <p className=' text-red-600'>{message}</p>
    </div>
  )
}
