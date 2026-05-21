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
            <Navbar />
            <HomeHero setMovies={setMovies} page={page} setPage={setPage} />
            <HomeMovie movies={movies} setMovies={setMovies} page={page} setPage={setPage} />
  
        </div>
    )
}

export default Home
