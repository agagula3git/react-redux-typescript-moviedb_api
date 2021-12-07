import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const IMG_URL = "http://image.tmdb.org/t/p/w1280/"

export default function ViewOne() {
    const location = useLocation();

    console.log(location);

    return (
        <div className="view-one">
            <Link to="/" className="back"><i className="fa fa-angle-left"></i> Back</Link>
            <img src={location.state.data.backdrop_path ? `${IMG_URL}${location.state.data.backdrop_path}` : `${IMG_URL}${location.state.data.poster_path}`} alt="backdrop_img"/>
            <h1>{location.state.data.title}</h1>
            <p style={{marginBottom: "0px", fontWeight: "bold"}}>Movie Overview:</p>
            <p id="overview">{location.state.data.overview}</p>
            <ul>
                {location.state.genre.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}         
            </ul>
        </div>
    )
}