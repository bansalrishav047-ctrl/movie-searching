import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className='z-99 h-[3.4vw] w-full bg-black py-2 px-4 text-[#7370DA] flex items-center justify-between '>
        <div className='text-xl'>
            <h1>Movie App</h1>
        </div>
        <div className='flex gap-7 text-lg pr-6'>
            <div onClick={() => window.location.reload()}>
              <Link to='/'>Home</Link>
            </div>
            <Link to='/favorite'>Favorites</Link>
        </div>
      
    </div>
  )
}

export default Navbar