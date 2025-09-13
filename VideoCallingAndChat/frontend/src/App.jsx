import { Routes, Link, Navigate } from 'react-router-dom'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import NotificationPage from './pages/NotificationPage'
import OnboardingPage from './pages/OnboardingPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import toast, { Toaster } from 'react-hot-toast'
import { Route } from 'react-router-dom'
import PageLoader from './components/PageLoader'
import useAuthUser from './hooks/useAuthUser'


const App = () => {



  const { isLoading, authUser } = useAuthUser()

  const isAuthenticated = Boolean(authUser) // convert authUser to boolean value
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />




  return (
    <div>

      <nav className='flex gap-4 p-1 bg-blue-400'>
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
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={
          !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          } />
        <Route path="/notifications" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={
          isAuthenticated ? (
            !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to="/login" />
          )
        } />
        
      </Routes>




      <Toaster />
    </div>
  )
}

export default App