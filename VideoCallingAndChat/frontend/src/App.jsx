import { Routes, Link, Navigate } from 'react-router-dom'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import NotificationPage from './pages/NotificationPage'
import OnboardingPage from './pages/OnboardingPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { Route } from 'react-router-dom'
import { axiosInstance } from './lib/axios'


const App = () => {


  const { data:authData, isLoading, error} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/me')
      return res.data;
    },
    retry: false
  })
  console.log(authData);
  const authUser = authData?.user

  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p>Somthing went Wrong</p>
  



  return (
    <div>

      <nav className='flex gap-4 p-4 bg-blue-800'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/call">Call</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/onboarding">Onboarding</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>



      <button onClick={() => toast.success("Kaise ho")}>Toast</button>

      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login" /> }/>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" /> }/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" /> } />
        <Route path="/notifications" element={authUser? <NotificationPage /> : <Navigate to="/login" /> } />
        <Route path="/call" element={authUser? <CallPage /> : <Navigate to="/login" /> } />
        <Route path="/chat" element={authUser? <ChatPage /> : <Navigate to="/login" /> } />
        <Route path="/onboarding" element={authUser? <OnboardingPage /> : <Navigate to="/login" /> } />
      </Routes>




      <Toaster />
    </div>
  )
}

export default App