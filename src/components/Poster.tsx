import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const API_KEY = process.env.REACT_APP_API_KEY

const IMG_URL = "http://image.tmdb.org/t/p/w1280/"
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

export interface Props{
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    original_name: string;
    first_air_date: string;
    genre_ids: Array<number>;
    backdrop_path: string;
}

const Poster: React.FC<Props> = ({
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
    original_name,
    first_air_date,
    genre_ids,
    backdrop_path
}) => {

    const history = useHistory();
    const date = release_date ? new Date(release_date) : new Date(first_air_date);
    const month = date.toLocalDateString('default', {month: 'short'});
    const day = date.getDay();
    const year = date.getYear() + 1900;

    const handleClick = () =>{
        axios({
            method: 'get',
            url: GENRE_URL
        })
        .then(res =>{
            history.push(
                "/show-one",
                {
                    data: {title, overview, original_name, poster_path, backdrop_path},
                    genre: res.data.genres.filter(item => genre_ids.includes(item.id))
                }
            );
        })
        .catch(err => console.log(err));
    }
    return (
        <div onClick={handleClick} className="card">
            <img src={`${IMG_URL}${poster_path}`} alt="poster_path"/>
            <div>{vote_average}/10</div>
            <p id="name">{title ? title: original_name}</p>
            <p id="date">{month} {day}, {year}</p>
        </div>
    )
}

export default Poster