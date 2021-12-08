export type MediaState = {
    loading: boolean;
    searchTerm: string;
    selectMedia: string;
    filteredMedia: string;
    topRatedMedia: string;
}

export const reducer = (
    state: MediaState = { loading: true, searchTerm: '', selectMedia: 'movies', filteredMedia: [], topRatedMedia: []}, 
    action: any) : MediaState =>{
        switch(action.type){
            case 'MAKE_REQUEST':
                return {
                    ...state,
                    loading: true
                }
            case 'MAKE_REQUEST1':
                return {
                    ...state
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
            default:
                return state
        }

}