import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { registerAction } from "../redux/features/registerSlice"
import ErrorComponent from "../component/ErrorComponent"

export default function RegisterPage() {
  const [name, setname] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [isPasswordSame, setIsPasswordSame] = React.useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const register = useSelector((state) => state.register)
  const { registerUser, loading, error } = register

  const handleComparePassword = (e) => {
    const { value } = e.target
    setIsPasswordSame(value === password ? "" : "Password do not match")
    setConfirmPassword(value)
  }

  React.useEffect(() => {
    if (registerUser) {
      navigate("/login")
    } else if (error) {
      setPassword("")
      setConfirmPassword("")
    }
  }, [setPassword, error, navigate, registerUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerAction({ name, email, password }))
  }

  return (
    <div className=' bg-gray-600 w-screen h-screen flex justify-center items-center'>
      <div className=' bg-white pb-9  lg:w-1/4 rounded-xl pl-8 pr-8'>
        <h1 className=' pt-9 text-3xl font-semibold text-gray-500 pb-9'>
          SIGN UP
        </h1>
        <form onSubmit={handleSubmit}>
          {error && <ErrorComponent message={error} />}
          {isPasswordSame && <ErrorComponent message={isPasswordSame} />}
          <div className=' pb-5'>
            <p className=' font-medium text-xl text-gray-500 pb-2'>Name</p>
            <input
              type='text'
              className=' border-2 border-gray-700 w-full h-9 pl-3'
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>
          <div className=' pb-5'>
            <p className=' font-medium text-xl text-gray-500 pb-2'>Email</p>
            <input
              type='text'
              className=' border-2 border-gray-700 w-full h-9 pl-3 '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className=' pb-5'>
            <p className=' font-medium text-xl text-gray-500 pb-2'>Password</p>
            <input
              type='password'
              className=' border-2 border-gray-700 w-full h-9 pl-3'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className=' pb-5'>
            <p className=' font-medium text-xl text-gray-500 pb-2'>
              Confirm Password
            </p>
            <input
              type='password'
              className=' border-2 border-gray-700 w-full h-9 pl-3'
              value={confirmPassword}
              onChange={handleComparePassword}
              required
            />
          </div>
          <div>
            <button
              disabled={isPasswordSame !== ""}
              type='submit'
              className=' w-full bg-pink-500 hover:bg-pink-400 h-9 rounded-lg text-lg text-white font-normal'
            >
              {loading ? "Loading..." : "SUBMIT"}
            </button>
          </div>
        </form>
        <p className=' pt-5'>
          Need an account ?{" "}
          <Link to={"/login"} className=' text-red-600'>
            Sign In
          </Link>{" "}
        </p>
      </div>
    </div>
  )
}
