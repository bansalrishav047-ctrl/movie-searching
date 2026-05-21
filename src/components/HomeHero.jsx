import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomeHero = ({ setMovies }) => {

    const [input, setInput] = useState('')


    const API_KEY = import.meta.env.VITE_TMBD_API_KEY

    async function searchMovies(input) {

        try {

            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}`
            )

            setMovies(response.data.results)

        } catch (error) {
            console.error('Error in searching movies', error)
        }
    }


    function inputHandler(e) {
        setInput(e.target.value)
    }

    function Submithandler(e) {
        e.preventDefault()

        if (input === '') {
            fetchMovie()
        }
        else
            searchMovies(input)
    }

    useEffect(() => {
        if (input === '') {
            fetchMovie()
        }
        else
            searchMovies(input)
    }, [input])


    const fetchMovie = async () => {
        try {

            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            setMovies(response.data.results)

        } catch (error) {
            console.error('Error in fetching movies', error)
        }
    }


    return (
        <div className=' h-[5.3vw]  bg-[#303030] py-6 flex items-center justify-center '>
            <form
                action="submit"
                className='flex gap-6 items-center justify-center mt-5'
                onSubmit={(e) => {
                    Submithandler(e)
                }}
            >
                <input
                    value={input}
                    onChange={(e) => {
                        inputHandler(e)
                    }}
                    className='p-3 h-[3vw] w-[25vw] text-white font-medium outline-none  rounded-sm bg-[#3E3E3E]'
                    type="text"
                    placeholder='Search for movies...'
                />
                <button
                    className='p-3 h-[3vw] text-lg font-semibold bg-red-600 text-white rounded-sm flex items-center justify-center cursor-pointer active:scale-95'>
                    Search
                </button>
            </form>
        </div>
    )
}

export default HomeHero
