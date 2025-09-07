
import React from 'react'
import { useQuery } from 'react-query'
import { getAuthUser } from '../lib/Api.js'

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // Auth check --that are help us to stop the refetching after by one. 
  })

  return {isloading: authUser.isLoading, authData: authUser.data}
}

export default useAuthUser