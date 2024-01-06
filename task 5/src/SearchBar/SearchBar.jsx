import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBar.css";
import MovieBar from "./MovieBar";

function SearchBar(props) {
    const [searchString, setSearchString] = useState("");
    const navigate = useNavigate();
    const [movies, setMovies] = useState(null);
    const [moviesToShow, setMoviesToShow] = useState(null);

    async function getMovies() {
        try {
            const fetchedMovies = await fetch(`http://localhost:3004/movies`).then((response) => response.json());
            const favoritesMovies = await fetch(
                `http://localhost:3004/favorites`
            ).then((response) => response.json());
            console.log(favoritesMovies);
            const moviesWithFavorites = fetchedMovies.map((movie) => ({
                ...movie,
                isFavorite: favoritesMovies.some((e) => e.id === movie.id),
            }));
            console.log(moviesWithFavorites);
            setMovies(moviesWithFavorites);
            setMoviesToShow(moviesWithFavorites);
        } catch (error) {
            console.log("Сбой загрузки фильмов:", error);
        }
    }

    function searchByName(nameByFind) {
        setMoviesToShow(
            movies.filter((movie) => movie.title.includes(nameByFind))
        );
    }

    useEffect(() => {
        (async () => {
            await getMovies();
        })()
    }, []);

    return (
        <div className="wrapper-0">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <input
                        className="search-line"
                        type="text"
                        placeholder="Название фильма"
                        onChange={(e) => setSearchString(e.target.value)}
                    ></input>
                    <button
                        className="search-button"
                        onClick={() => movies && searchByName(searchString)}
                    >
                        Поиск
                    </button>
                </div>
                {moviesToShow &&
                    moviesToShow.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <MovieBar
                                id={movie.id}
                                isFavorite={movie.isFavorite}
                                isSelected={Number(movie.id) === Number(props.movieId)}
                                title={movie.title}
                                year={movie.year}
                                genres={movie.genres}
                            ></MovieBar>
                        </Link>
                    ))}
            </div>
            <div className="movie-bar-parent">
                <div className="movie-bar-footer">
                    <div className="footer-wrapper">
                        <span className="footer-text">{`${moviesToShow ? moviesToShow.length : 0} фильмов найдено`}</span>
                        <button
                            className="footer-button"
                            onClick={() => navigate("/createMovie")}
                        >
                            Добавить фильм
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
