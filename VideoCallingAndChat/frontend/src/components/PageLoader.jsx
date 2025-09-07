import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return ( 
    <div className='min-h-screen flex justify-center items-center'>
      <LoaderIcon className='animated-spin size-10 text-primary' />
    </div>
  )
}

export default PageLoader