import React, { useState, useEffect } from 'react'
import axios from '../axios'
import requests from '../requests'
import './Banner.css'

const Banner = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovies(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
            return request;
        }
        fetchData();
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}>
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movies?.title || movies?.name || movies?.original_name}
                </h1>
                <div className="banner_button">
                    <button className="banner_btn">Play</button>
                    <button className="banner_btn">My WatchList</button>
                </div>
                <h1 className="banner_description">{truncate(movies?.overview, 200)}</h1>
            </div>
            <div className="banner_fadeBottom" />
        </header>
    )
}

export default Banner
