import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomeMovie = ({ movies, setMovies, page, setPage, searchQuery }) => {

    const API_KEY = import.meta.env.VITE_TMBD_API_KEY

    const [loading, setLoading] = useState(false)

    const fetchMovie = async (page) => {

        if (loading) return

        setLoading(true)

        try {

            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
            )

            setMovies((prev) => [
                ...prev,
                ...response.data.results
            ])

        } catch (error) {

            console.error('Error in fetching movies', error)

        }finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        if (page >1 && !searchQuery) fetchMovie(page)
    }, [page])

    useEffect(() => {

        if(movies.length > 0){

            const handleScroll = () => {

            const bottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 100

            if (bottom && !loading) {

            setPage((prev) => prev + 1)
        }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }else{
        setLoading(false)
    }   

    }, [loading, movies.length])


    const [showNoResults, setShowNoResults] = useState(false)

    useEffect(() => {
        if (movies.length > 0) {
            setShowNoResults(false)
            return
        }

        if (loading) return

        const timer = setTimeout(() => {
            setShowNoResults(true)
        }, 3000)

        return () => clearTimeout(timer)

    }, [movies.length, loading]) 


    const [likedMovies, setLikedMovies] = useState(() => {
    const stored = localStorage.getItem("favoriteMovies")

        return stored ? JSON.parse(stored) : []
    })

    const toggleLike = (movie) => {
        const exists = likedMovies.find(
            (item) => item.id === movie.id
        )

        if (exists) {
        setLikedMovies((prev) =>
            prev.filter((item) => item.id !== movie.id)
        )
        } else {
            setLikedMovies((prev) => [
            ...prev,
            movie
            ])
        }
  } 

    useEffect(() => {
        localStorage.setItem(
            "favoriteMovies",
            JSON.stringify(likedMovies)
        )
    }, [likedMovies])

    return (
        <div className='min-h-screen bg-[#303030] px-12 py-6 flex flex-wrap overflow-y-auto gap-7 flex-row justify-between items-center'>
            {
                movies.length !== 0 ?
                    <>
                        {
                            movies.map((movie, index) => {
                                return (
                                    <div key={`${movie.id}-${index}`} id='movie-fetcher' className='bg-[#262626] h-[28vw] w-[17vw] rounded-xl shrink-0 overflow-hidden transition duration-300 hover:scale-105'>
                                        <div className='h-[77%] w-full rounded-xl relative group overflow-hidden'>
                                            <img
                                                loading='lazy'
                                                className='h-full w-full object-cover rounded-t-xl'
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-end items-start p-[0.2vw]'>
                                                <button
                                                    onClick={() => toggleLike(movie)}
                                                    className='text-2xl'
                                                >
                                                    {
                                                        likedMovies.some(
                                                            (item) => item.id === movie.id
                                                        )
                                                            ? "❤️"
                                                            : "🤍"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div className='px-4 py-2 text-lg font-semibold text-white'>
                                            <h1>{movie.title}</h1>
                                        </div>
                                        <div className='px-4 py-0 text-medium text-gray-500'>
                                            <h1>{movie.release_date}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }   
                    </>
                    :
                    <div className='h-[20%] w-full  bg-[#303030] py-6 flex items-center justify-center mb-53'>
                        {showNoResults
                            ? <h1 className='text-white font-bold text-3xl'>No results found...</h1>
                            : <div className="animate-spin rounded-full h-10 w-10 border-b-3 border-white"></div>
                        }
                    </div>

            }
        </div>
    )
}

export default HomeMovie
