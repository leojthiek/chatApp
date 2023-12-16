import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import ErrorComponent from "../component/ErrorComponent"
import { loginAction } from "../redux/features/loginSlice"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginUser = useSelector((state) => state.loginUser)
  const { user, error, loading } = loginUser

  React.useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginAction({email,password}))
  }

  return (
    <div className=' bg-gray-600 w-screen h-screen flex justify-center items-center'>
      <div className=' bg-white pb-9 lg:w-1/4 rounded-xl pl-8 pr-8'>
        <h1 className=' pt-9 text-3xl font-semibold text-gray-500 pb-9'>
          SIGN IN
        </h1>
        {error && <ErrorComponent message={error}/> }
        <form onSubmit={handleSubmit}>
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
          <div>
            <button type="submit" className=' w-full bg-pink-500 hover:bg-pink-400 h-9 rounded-lg text-lg text-white font-normal'>
             {loading ? "Loading...": "SUBMIT"} 
            </button>
          </div>
        </form>
        <p className=' pt-5'>
          Already a user ?{" "}
          <Link to={"/register"} className=' text-red-600'>
            Sign Up
          </Link>{" "}
        </p>
      </div>
    </div>
  )
}
