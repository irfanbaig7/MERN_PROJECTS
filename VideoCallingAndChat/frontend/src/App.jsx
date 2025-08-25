import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import NotificationPage from './pages/NotificationPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import toast, { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div className='h-screen data-theme="night"'>
      <p>App section</p>

      <Link to={"/"} >Home</Link>
      <br />

      <Link to={"/signup"} >signUp</Link>
      <br />

      <Link to={"/login"} >login</Link>
      <br />

      <Link to={"/chat"} >chat</Link>
      <br />

      <Link to={"/notifications"} >notifiy</Link>
      <br />

      <Link to={"/call"} >call</Link>
      <br />

      <Link to={"/onboarding"} >onBoard</Link>
      <br />
      <br />
      <br />


      <button onClick={() => toast.error("hieee")}>CreateToast</button>


      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/call' element={<CallPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App