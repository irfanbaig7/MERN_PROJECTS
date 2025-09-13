import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logIn } from '../lib/Api'
import toast from 'react-hot-toast'

const useLogin = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, error } = useMutation({
        mutationFn: logIn,
        onSuccess: () => {
            toast.success("Login SuccessFully")
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        }
    })

    return { loginMutation: mutate, error, isPending }
}

export default useLogin