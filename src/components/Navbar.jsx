import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className=' h-[3.4vw] w-full bg-black py-2 px-4 text-[#7370DA] flex items-center justify-between '>
        <div onClick={() => window.location.reload()} className='text-xl'>
            <button>Movie App</button>
        </div>
        <div className='flex gap-7 text-lg pr-6'>
            <div className='underline'>
              <Link to='/'>Home</Link>
            </div >
            <div className='underline'>
              <Link to='/favorite'>Favorites</Link>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar