import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../Store/useThemeStore'

const PageLoader = () => {

  const { theme } = useThemeStore()

  return ( 
    <div className='min-h-screen flex justify-center items-center' data-theme={theme}>
      <LoaderCircle className='animate-spin size-10 text-primary' />
    </div>
  )
}

export default PageLoader