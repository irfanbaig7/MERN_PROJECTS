import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logOut } from '../lib/Api'
import toast from 'react-hot-toast'

const useLogOut = () => {

    const queryClient = useQueryClient()

    const {mutate: logoutMutation, isPending, error} = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["authUser"]})
        }
    })

    
    
    return {logoutMutation, isPending, error}

}

export default useLogOut