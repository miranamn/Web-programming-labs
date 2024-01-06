import React from "react";

function MainInfo(props) {
    function getDuration(duration) {
        return `${Math.floor(duration / 60)} ч. ${duration % 60} м.`;
    }

    function getActors(actorsString) {
        const splitted = actorsString.split(", ");
        const size = Math.min(splitted.length, 3);
        return splitted.slice(0, size).map(actor => (
            <span key={actor} className="roboto-16">
                {actor}
            </span>
        ));
    }

    const handleImageError = (event) => {
        event.target.src =
            "https://topnaroda.com/uploads/poster_none.png";
    };

    function renderInfoRow(label, content) {
        return (
            <div className="row-wrap gap-15-wrapper">
                <span className="roboto-16 gray-color">{label}</span>
                <span className="roboto-16">{content}</span>
            </div>
        );
    }

    return (
        <div className="main-info-wrapper width-100">
            <img
                src={props.movie.posterUrl}
                alt={`${props.movie.title} poster`}
                onError={handleImageError}
            />
            <div className="column gap-20-wrapper width-100">
                <div className="column gap-5-wrapper">
                    <span className="roboto-24">{props.movie.title}</span>
                    <span className="roboto-16 fv-500 gray-color">{props.movie.director}</span>
                </div>
                <div className="sub-info-wrapper width-100">
                    <div className="column gap-5-wrapper">
                        {renderInfoRow("Продолжительность", getDuration(props.movie.runtime))}
                        {renderInfoRow("Жанр", props.movie.genres.join(", "))}
                        {renderInfoRow("Год", props.movie.year)}
                        {renderInfoRow("В главных ролях:", <div className="column gap-10-wrapper">{getActors(props.movie.actors)}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainInfo;
