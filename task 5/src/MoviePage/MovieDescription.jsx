import React from "react";

function MovieDescription(props) {

    return (
        <>
            <span className="roboto-20 description-title">Описание</span>
            <span className="roboto-16">{props.description}</span>
            <div className="row-wrap rating">
                <span className="roboto-20 fv-500">Рейтинг</span>
                <span className={`roboto-32`}> {props.rating || "-"} </span>
            </div>
        </>
    );
}

export default MovieDescription;
