import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditCreatePage.css";
import SearchBar from "../SearchBar/SearchBar";

function EditCreatePage(props) {
    const params = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [rating, setRating] = useState("");
    const [actors, setActors] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState("");
    const [runtime, setRuntime] = useState("");
    const [director, setDirector] = useState('');
    const [genres, setGenres] = useState("");


    async function getMovie() {
        try {
            await fetch(`http://localhost:3004/movies/${params.id}`).then((response) => response.json()).then(
                data => {
                    setMovie(data);
                    setTitle(data.title);
                    setUrl(data.posterUrl);
                    setDescription(data.plot);
                    setYear(data.year);
                    setRuntime(data.runtime);
                    setRating(data.rating);
                    setActors(data.actors.replaceAll(",", ";"));
                    setDirector(data.director);
                    setGenres(data.genres.join("; "));
                }
            );
        } catch (err) {
            console.log("Сбой при получении фильма");
        }
    }

    useEffect(() => {
        if (props.type === "edit") {
            (async () => {
                await getMovie();
            })().catch(error => { console.log("Сбой при получении фильма"); });
        } 
        else {
            setTitle("");
            setUrl("");
            setDescription("");
            setYear("");
            setRuntime("");
            setRating("");
            setActors("");
            setDirector("");
            setGenres("");
        }
    }, [params]);

    function cancel() {
        if (props.type === "edit") navigate(`/movie/${movie.id}`);
        else navigate("/");

    }

    async function updateMovie() {
        try {
            const movieToSet = {
                title,
                year,
                runtime,
                genres: genres.split("; "),
                director,
                actors: actors.replaceAll(";", ","),
                plot: description,
                posterUrl: url,
                rating
            };   
            if (props.type !== "edit") {
                const allMovies = await fetch("http://localhost:3004/movies").then(response => response.json());
                movieToSet.id = allMovies.length + 1;
            } 
            else movieToSet.id = movie.id;  
            const fetchUrl = props.type === "edit" ? `http://localhost:3004/movies/${movie.id}` : "http://localhost:3004/movies";
            const fetchType = props.type === "edit" ? "PUT" : "POST";  
            if (title !== "" && year !== "" && runtime !== "" && genres !== "" && director !== "" && actors !== "" && description !== "" && url !== "" && rating !== "") {
                await fetch(fetchUrl, {
                    method: fetchType,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(movieToSet)
                });
            } 
            else {
                console.log("Введите необходимые поля");
                return;
            }
            navigate(`/movie/${movieToSet.id}`);
        } catch (err) {
            console.error(err);
        }
    }   

    const renderInput = (label, value, onChange, placeholder) => (
        <div className="column gap-8-wrapper">
            <span className="roboto-16">{label}</span>
            <input className="search-line input-wrapper-44" 
            type="text" 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} />
        </div>
    );
    
    const renderTextarea = (label, value, onChange, placeholder) => (
        <div className="column gap-8-wrapper">
            <span className="roboto-16">{label}</span>
            <textarea className="search-line input-description" 
            type="text" 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} />
        </div>
    );

    return (
        <>
            <SearchBar />
            <div className="column wrapper-form">
                <div className="form-page-wrapper column gap-15-wrapper">
                    <span className="roboto-24">{props.type === "edit" ? "Редактирование" : "Создание"}</span>
                    {renderInput("Название фильма", title, (e) => setTitle(e.target.value), "Введите название фильма")}
                    {renderInput("Год выпуска", year, (e) => setYear(e.target.value), "Введите год выпуска")}
                    {renderTextarea("Описание", description, (e) => setDescription(e.target.value), "Введите описание")}
                    {renderInput("Укажите ссылку на обложку", url, (e) => setUrl(e.target.value), "Введите ссылку на обложку")}
                    {renderInput("Рейтинг", rating, (e) => setRating(e.target.value), "Введите рейтинг фильма")}
                    {renderInput("Укажите список актеров", actors, (e) => setActors(e.target.value), "Введите актеров (через ;)")}
                    {renderInput("Режиссер", director, (e) => setDirector(e.target.value), "Введите режиссера")}
                    {renderInput("Жанры", genres, (e) => setGenres(e.target.value), "Введите жанры (через ;)")}
                    {renderInput("Длительность", runtime, (e) => setRuntime(e.target.value), "Введите длительность")}
                </div>
                <div className="form-footer row-wrap">
                    <div className="row-wrap gap-20-wrapper buttons-wrapper">
                        <button className="btn-1" onClick={() => cancel()}>Отменить</button>
                        <button className="btn" onClick={() => updateMovie()}>Сохранить</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCreatePage;