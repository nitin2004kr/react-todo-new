import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Foreground from './components/foreground/Foreground'

function App() {


  return (
    <>
      <div className='w-full h-screen bg bg-zinc-100 flex' >
        {/* --- sidebar navigation --- */}
        <div className='h-full lg:w-1/5 md:w-1/4 w-37 py-5 px-2' >
          <Sidebar />
        </div>

        {/* --- foreground dashboard --- */}
        <div className='h-full flex-grow py-5 px-2 ' >
          <Foreground />
        </div>
      </div>
    </>
  )
}

export default App
