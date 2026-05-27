import React, { useEffect, useState } from 'react'
import HomeMovie from './HomeMovie'

const FavoritePage = () => {


  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {

    const storedMovies =
      JSON.parse(
        localStorage.getItem("favoriteMovies")
      ) || []
      setFavoriteMovies(storedMovies)
  }, [])


  const removeFavorite = (id) => {

    const updatedMovies = favoriteMovies.filter(
        (movie) => movie.id !== id
    )

    setFavoriteMovies(updatedMovies)

    localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(updatedMovies)
    )
  }



  return (
    <div className='min-h-screen w-full bg-[#303030] flex flex-col gap-0'>
        <div className='p-7 flex items-center justify-center text-white font-semibold text-2xl '>
            <h1>Your Favorite Movies</h1>
        </div>

         <div className='min-h-full bg-[#303030] px-12 py-6 flex flex-wrap overflow-y-auto gap-7  justify-start items-center '>
            {
                favoriteMovies.length !== 0 ?
                    <>
                        {
                            favoriteMovies.map((movie, index) => {
                                return (
                                    <div key={`${movie.id}-${index}`} id='movie-fetcher' className='bg-[#262626] h-[28vw] w-[17vw] rounded-xl shrink-0 overflow-y-auto'>
                                        <div className='h-[77%] w-full rounded-xl relative group overflow-hidden'>
                                            <img
                                                className='h-full w-full object-cover rounded-t-xl'
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-end items-start p-[0.2vw]'>
                                                <button
                                                  onClick={() => removeFavorite(movie.id)}
                                                  className='text-2xl'
                                                >
                                                  ❤️
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
                    <div className='h-[20%] w-full  bg-[#303030] py-6 flex items-center justify-center mt-50'>
                             <h1 className='text-white font-bold text-3xl'>No favorite movies...</h1>                         
                    </div>

            }
        </div>
        

    </div>
  )
}

export default FavoritePage

