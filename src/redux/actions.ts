const API_KEY = process.env.REACT_APP_API_KEY

export function fetchTopRatedMedia(media: string, term: string, bool: boolean){
    return function (dispatch: any){
        if( !term || bool){
            dispatch({type: 'MAKE_REQUEST'});
        }
        console.log(bool)
        setTimeout(async function(){
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

export function fetchFilteredMedia(media: string, term: string){
    return function(dispatch: any){
        dispatch({type: 'MAKE_REQUEST'});
        setTimeout(async function(){
            try{
                const response = await fetch(
                    media === 'movies' ? `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}` : 
                                        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`, 
                        {method: 'get'})
                const data = await response.json();
                
                dispatch({type: 'GET_FILTERED_MEDIA', payload: data.results.slice(0, 10).filter((item: any) => item.title ? item.title.toUpperCase().includes(term.toUpperCase()) : item.original_name.toUpperCase().includes(term.toUpperCase()))})
            }catch(err){
                dispatch({type: 'ERROR'});
            }
        }, 500);
    }
}

export function updateInputElement(media: string, term: string){
    return async function(dispatch: any){
        dispatch({type: 'UPDATE_INPUT_ELEMENT', payload: {media, term}});
    }
}

export function setDisplayItemIndicator(bool: boolean){
    return function(dispatch: any){
        dispatch({type: 'SET_DISPLAY_ITEM_INDICATOR', payload: {active: bool}});
    }
}