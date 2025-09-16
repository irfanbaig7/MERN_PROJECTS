import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signUp } from '../lib/Api';
import toast from 'react-hot-toast';

const useSignup = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate, error } = useMutation({ // here usemutation basically use hota hai data post, update, delete 
        mutationFn: signUp,
        onSuccess: () => { 
            toast.success("Singup SuccessFully")
            queryClient.invalidateQueries({ queryKey: ["authUser"] }) 
        } // on sucess kya refetch karne ka kam karta hai 
    });

    return { signupMutaion: mutate, isPending, error }
}

export default useSignup