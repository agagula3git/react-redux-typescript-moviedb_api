import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector} from '../redux/hooks'
import Poster from './Poster'

export default function HomePage() {

    const { loading, searchTerm, selectMedia, filteredMedia, topRatedMedia } = useAppSelector((state: MediaState) => ({
        loading: state.loading,
        searchTerm: state.searchTerm,
        selectMedia: state.selectMedia,
        filteredMedia: state.filteredMedia,
        topRatedMedia: state.topRatedMedia
    }));

    const [radio, setRadio] = useState('movies');
    const [state, setState] = useState({searchItem: '', bool: false});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;
        if(type === 'radio'){
            setRadio(name);
        }else{
            setState({
                searchItem: value,
                bool: true
            });
        }
    } 

    useEffect(()=>{
        dispatch(updateInputElement(radio, state.searchItem));
        state.searchItem.length >= 3 ? dispatch(fetchFilteredMedia(radio, state.searchItem, topRatedMedia)) : dispatch(fetchTopRatedMedia(radio, state.searchItem, state.bool))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.searchItem, radio])

    const dispatch = useAppDispatch();

    return (
        <div className="wrapper">
            <input 
                type="radio" 
                id="movies" 
                name="movies" 
                checked={radio === "movies"} 
                onChange={handleChange}
            />
            <input
                type="radio"
                id="shows"
                name="shows"
                checked={radio === "shows"}
                onChange={handleChange}
            />
            <nav>
                <label for="movies" className="movies">Movies</label>
                <label for="shows" className="shows">TV-Shows</label>
                <div className="slider"></div>
            </nav>
            <div className="search-block">
                <input 
                    type="text" 
                    onChange={handleChange} 
                    value={state.searchItem} 
                    name={searchItem} 
                    placeholder="Search"
                />
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <div className="cards-list">
                {loading ? <p>Loading...</p> : state.searchItem.length >= 3 ? filteredMedia.map(item => (
                    <Poster key={item.id} props={item}/>)) 
                : topRatedMedia.map(item => (
                    <Poster key={item.id} props={item}/>
                ))}
            </div>
        </div>
    )


}