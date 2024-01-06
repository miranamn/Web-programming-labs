import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoviePage.css";
import MainInfo from "./MainInfo";
import MovieHeader from "./MovieHeader";
import MovieDescription from "./MovieDescription";
import SearchBar from "../SearchBar/SearchBar";

function MoviePage() {
    const params = useParams();
    const [movie, setMovie] = useState(null);

    const fetchMovie = async () => {
        try {
            const response = await fetch(`http://localhost:3004/movies/${params.id}`);
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.log("Сбой при получении фильма");
        }
    };

    useEffect(() => {
        (async () => {
            await fetchMovie();
        })()
    }, [params]);

    return (
        <>
            {movie && (
                <>
                    <SearchBar movieId={params.id}></SearchBar>
                    <div className="column movie-main-info-wrapper width-100">
                        <MovieHeader id={params.id}></MovieHeader>
                        <MainInfo movie={movie}></MainInfo>
                        <MovieDescription description={movie.plot} rating={movie.rating}></MovieDescription>
                    </div>
                </>
            )}
        </>
    );
}

export default MoviePage;