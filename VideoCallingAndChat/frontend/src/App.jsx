import React, { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import NotificationPage from './pages/NotificationPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import { Toaster } from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"

const App = () => {

  // without using TanStack Query
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


  // use tanstack Query

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      // with fetch
      // const data = await fetch('https://jsonplaceholder.typicode.com/todos')
      // const jsonRes = await data.json()
      // return jsonRes

      // use Axios rather than fetch
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
      return res.data
    }
  })

  console.log({data});
  console.log({isLoading});
  console.log({error});
  

   



  return (
    <div className='h-screen data-theme="night"'>
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