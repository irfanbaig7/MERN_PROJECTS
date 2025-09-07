import { Route, Routes, Link, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import NotificationPage from './pages/NotificationPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import { Toaster } from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
// import axios from "axios"
import { axiosInstance } from './lib/axios.js'
import PageLoader from './components/PageLoader.jsx'
import { getAuthUser } from './lib/Api.js'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {

  // using states and fetching aaproch

  // const [data, setData] = useState([])
  // const [isLoading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   const getData = async () => {
  //     setLoading(true)
  //     try {
  //       const data = await fetch('https://jsonplaceholder.typicode.com/todos/')
  //       const jsonRes = await data.json()
  //       setData(jsonRes)
  //     } catch (error) {
  //       setError(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   getData() 
  // }, [])
  // console.log(data);


  // use tanstack Query and axios(fetching data)

  
  const {isloading, authUser} = useAuthUser() 

  const isAuthenticated = Boolean(authUser)

  const isOnboardingComplete = authUser.isOnboardingComplete 

  if (isLoading) return <PageLoader />
  

  // if (error) {
  //   return <div>Something went wrong</div>
  // }
  
  
  return (
    <div className='h-screen data-theme="night"'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to="/login" /> } />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to="/login" /> } />
        <Route path='/onboarding' element={authUser ? <OnboardingPage /> : <Navigate to="/login" /> } />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App