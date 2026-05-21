import React from 'react'
import Navbar from '../components/Navbar'
import HomeHero from '../components/HomeHero'
import HomeMovie from '../components/HomeMovie'
import { useState } from 'react'


const Home = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)

    return (
        <div>
            <div className='sticky top-0 z-50 bg-black'>
                <Navbar />
            </div>

            <HomeHero setMovies={setMovies} page={page} setPage={setPage} />
            <HomeMovie movies={movies} setMovies={setMovies} page={page} setPage={setPage} />
  
        </div>
    )
}

export default Home
