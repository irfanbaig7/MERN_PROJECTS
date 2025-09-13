import React from 'react'
import { getAuthUser } from '../lib/Api'
import { useQuery } from '@tanstack/react-query'

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false // // retry: false → no auto retries on error (only 1 request)
  })

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user}


}

export default useAuthUser