import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector} from '../redux/hooks'
import { fetchTopRatedMedia, fetchFilteredMedia, updateInputElement, setDisplayItemIndicator } from '../redux/actions'
import Poster from './Poster'
import Header from './Header'
import { MediaState } from '../redux/reducer'
import './HomePage.css'

export default function HomePage() {

    const { loading, searchTerm, displayItemIndicator, selectMedia, filteredMedia, topRatedMedia } = useAppSelector((state: MediaState) => ({
        loading: state.loading,
        searchTerm: state.searchTerm,
        displayItemIndicator: state.displayItemIndicator,
        selectMedia: state.selectMedia,
        filteredMedia: state.filteredMedia,
        topRatedMedia: state.topRatedMedia
    }));

    const [radio, setRadio] = useState(selectMedia);
    const [state, setState] = useState({searchItem: '', bool: false});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;
        if(displayItemIndicator){
            setState({searchItem: searchTerm, bool: false})
        }
        dispatch(setDisplayItemIndicator(false))
        if(type === 'radio'){
            setRadio(name);
        }else{
            console.log(state.searchItem.length)
            if(state.searchItem.length >= 3){
                setState({searchItem: value, bool: true});
            }else{
                setState({searchItem: value, bool: false});
            }
        }
    } 
    console.log(filteredMedia)
    useEffect(()=>{
        if( !displayItemIndicator ){
            dispatch(updateInputElement(radio, state.searchItem));
            state.searchItem.length >= 3 ? dispatch(fetchFilteredMedia(radio, searchTerm)) : dispatch(fetchTopRatedMedia(radio, state.searchItem, state.bool))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.searchItem, radio, displayItemIndicator])

    const dispatch = useAppDispatch();

    return (
        <div>
            <Header/>
            <div className="wrapper">
                <input 
                    type="radio" 
                    id="movies" 
                    name="movies" 
                    checked={selectMedia === "movies"} 
                    onChange={handleChange}
                />
                <input
                    type="radio"
                    id="shows"
                    name="shows"
                    checked={selectMedia === "shows"}
                    onChange={handleChange}
                />
                <nav>
                    <label htmlFor="movies" className="movies">Movies</label>
                    <label htmlFor="shows" className="shows">TV-Shows</label>
                    <div className="slider"></div>
                </nav>
                <div className="search-block">
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        value={searchTerm} 
                        name={searchTerm} 
                        placeholder="Search"
                    />
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className="cards-list">
                    {loading ? <div style={{height: '570px'}}><p>Loading...</p></div> : searchTerm.length >= 3 ? filteredMedia.map(item => (
                        <Poster 
                            overview={item.overview}
                            poster_path={item.poster_path}
                            release_date={item.release_date}
                            title={item.title}
                            vote_average={item.vote_average}
                            original_name={item.original_name}
                            first_air_date={item.first_air_date}
                            genre_ids={item.genre_ids}
                            backdrop_path={item.backdrop_path}
                        />
                    )) 
                    : topRatedMedia.map(item => (
                        <Poster 
                            overview={item.overview}
                            poster_path={item.poster_path}
                            release_date={item.release_date}
                            title={item.title}
                            vote_average={item.vote_average}
                            original_name={item.original_name}
                            first_air_date={item.first_air_date}
                            genre_ids={item.genre_ids}
                            backdrop_path={item.backdrop_path}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}