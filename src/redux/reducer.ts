

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
                    ...state
                }
            case 'MAKE_REQUEST1':
                return {
                    ...state
                }
            case 'GET_FILTERED_MEDIA':
                return {

                }
            case 'GET_TOP_RATED_MEDIA':
                return {

                }
            case 'UPDATE_INPUT_ELEMENT':
                return{

                }
            default:
                return state
        }

}