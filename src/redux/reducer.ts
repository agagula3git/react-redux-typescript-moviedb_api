import { MediaData } from '../components/Poster'

export type MediaState = {
    loading: boolean;
    searchTerm: string;
    displayItemIndicator: boolean;
    selectMedia: string;
    filteredMedia: Array<MediaData>;
    topRatedMedia: Array<MediaData>;
}

export const reducer = (
    state: MediaState = { loading: true, searchTerm: '', displayItemIndicator: false, selectMedia: 'movies', filteredMedia: [], topRatedMedia: []}, 
    action: any) : MediaState =>{
        switch(action.type){
            case 'MAKE_REQUEST':
                return {
                    ...state,
                    loading: true
                }
            case 'GET_FILTERED_MEDIA':
                return {
                    ...state,
                    filteredMedia: action.payload,
                    loading: false
                }
            case 'GET_TOP_RATED_MEDIA':
                return {
                    ...state,
                    loading: false,
                    filteredMedia: [],
                    topRatedMedia: action.payload
                }
            case 'UPDATE_INPUT_ELEMENT':
                return{
                    ...state,
                    selectMedia: action.payload.media,
                    searchTerm: action.payload.term
                }
            case 'SET_DISPLAY_ITEM_INDICATOR':
                return {
                    ...state,
                    displayItemIndicator: action.payload.active
                }
            default:
                return state
        }

}