import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer"
import axios from "../axios";

import './Row.css'

const base_URL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchURL, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerURL, setTrailerURL] = useState("")
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoPlay: 1,
        }
    }
    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerURL("");
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlParams.get('v'));
                }).catch(error => console.log(error))
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => { handleClick(movie) }}
                        className={`row_poster ${isLargeRow && "row_posterLargeRow"}`}
                        src={`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        </div>
    );
};

export default Row;
