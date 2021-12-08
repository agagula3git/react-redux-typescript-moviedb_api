const API_KEY = process.env.REACT_APP_KEY

export function fetchTopRatedMedia(media: string, term: string, bool: boolean){
    return async function (dispatch: any){
        if(!term && !bool){
            dispatch({type: 'MAKE_REQUEST'});
        }
        setTimeOut(()=>{
            try{
                const response = await fetch(
                    media === 'movies' ? `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}` : 
                                        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`, 
                        {method: 'get'})
                const data = await response.json();
                
                dispatch({type: 'GET_TOP_RATED_MEDIA', payload: data.results.slice(0, 10)})
            }catch(err){
                dispatch({type: 'ERROR'});
            }

        }, 500);
    }
}

export function fetchFilteredMedia(media: string, term: string, obj: any){
    return async function(dispath){
        dispatch({type: 'MAKE_REQUEST'});
        setTimeout(()=>{
            try{
                const response = await fetch(media === 'movies' ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${term}` : `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${term}`, {method: 'get'})
                const data = await response.json();

                dispatch({type: 'GET_FILTERED_MEDIA', payload: data.results.filter(item => obj.some(top => top.id === item.id))})
            }catch(err){
                dispatch({type: 'ERROR'});
            }
        }, 500)
    }
}

export function updateInputEl(media: string, term: string){
    return async function(dispatch){
        dispatch({type: 'UPDATE_INPUT_ELEMENT', payload: {media, term}});
    }
}