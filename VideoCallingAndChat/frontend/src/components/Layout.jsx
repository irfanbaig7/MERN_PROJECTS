import React from 'react'
import SideeBar from './SideeBar'
import Navvbar from './Navvbar'
import NotificationPage from '../pages/NotificationPage'

const Layout = ({showSiderbar, children}) => {

  return (
    <div className='min-h-screen'>
      <div className="flex">
        {showSiderbar && <SideeBar />}

        <div className="flex flex-1 flex-col">
          <Navvbar />
          <main className='flex-1 overflow-y-auto'>
            {children}
          </main>
        </div>


      </div>
    </div>
  )
}

export default Layout