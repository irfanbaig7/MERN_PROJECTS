import { ShipWheelIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import useLogin from '../hooks/useLogin'

const LoginPage = () => {

  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  
  // this is how we did it at frist, without using our custom hook.

  // const queryClient = useQueryClient()
  // const { isPending, mutate: loginMutation, error } = useMutation({
  //   mutationFn: logIn,
  //   onSuccess: () => {
  //     toast.success("Login Successfully! 🤩")
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] })
  //   },

  //   // onError: (error) => {
  //   //   toast.error(error?.response?.data?.message || error.message || "Login Failed 😣")
  //   // }
  // })


  const { isPending, error, loginMutation } = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation(loginData)
  }


  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest" >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Chatiee
            </span>
          </div>


          {/* Error handling  */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error?.response?.data?.message || error?.response?.data?.error || error.message}</span>
            </div>
          )
          }

          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account and continue your language journey
                  </p>
                </div>

                <div className="space-y-3">
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="text-[#CAC9C9]">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="text-[#CAC9C9]">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>

                </div>

                <button className="btn btn-primary w-full" type="submit">

                  {isPending ? "Sign in" : "Create Account"}

                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account ?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      create one
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Videocallpana.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default LoginPage