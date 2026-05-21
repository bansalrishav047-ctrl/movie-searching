import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Favorite from './pages/Favorite'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favorite' element={<Favorite />}/>
      </Routes>
      
    </div>
  )
}

export default App
