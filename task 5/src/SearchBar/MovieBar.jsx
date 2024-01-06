import React from "react";
import Star from "../component/Star";

function MovieBar(props) {
    const { isSelected, title, id, isFavorite, year, genres } = props;

    return (
        <div className={`movie-bar ${isSelected ? "movie-bar-selected" : ""}`}>
            <div className="row-wrap gap-5-wrapper">
                <span className="movie-name">{title}</span>
                <Star id={id} isFavorite={isFavorite} />
            </div>
            <span className="movie-info">{`${year} | ${genres.join(", ")}`}</span>
        </div>
    );
}

export default MovieBar;
