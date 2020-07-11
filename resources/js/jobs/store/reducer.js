import { getCookie, setCookie } from '../cookie';

const initialState = {
    name: '',
    searchResults: [],
    recentSearches: [],

};

function reducer(state = initialState, action) {
    const newState = {...state};

    switch (action.type) {
        case 'connected':
            console.log(action.componentName + ' connected');
            break;
        case 'SET_NAME':
            newState.name = action.name;
            break;
        case 'SET_SEARCH_RESULTS':
            newState.searchResults = {...action.searchResults};
            break;
        case 'SET_RECENT_SEARCHES':
            // get recentSearches
            let recentSearches = getCookie('recentSearches');
            recentSearches = recentSearches.split('|');

            // set new recentSearches
            if (!newState.recentSearches.includes(action.name) && action.name !== '')
            {
                recentSearches.unshift(action.name);
                recentSearches = recentSearches.join('|')
                setCookie('recentSearches', recentSearches, 1);
            }

            // set recent searches
            newState.recentSearches = [action.name, ...newState.recentSearches.filter(item => item !== action.name)];            
            break;
        case 'SET_RECENT_SEARCHES_FROM_COOKIES':
            if (getCookie('recentSearches') !== '') {
                newState.recentSearches = getCookie('recentSearches').split('|');
                console.log(newState.recentSearches = getCookie('recentSearches').split('|'));
            }
            break;
        default:
            break;
    }

    return newState;
}

export default reducer;