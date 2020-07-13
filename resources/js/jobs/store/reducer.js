import { getCookie, setCookie } from '../cookie';
import { slice } from 'lodash';

const initialState = {
    name: '',
    searchResults: [],
    unMutableSearchResults: [],
    recentSearches: [],
    filters: {
        showFixed: true,
        visited: 0,
    }
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
            newState.searchResults = [...action.searchResults];
            newState.unMutableSearchResults = [...action.searchResults];
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
            newState.recentSearches = [action.name, ...newState.recentSearches.filter(item => item != action.name)];            
            break;
        case 'SET_RECENT_SEARCHES_FROM_COOKIES':
            if (getCookie('recentSearches') !== '') {
                newState.recentSearches = getCookie('recentSearches').split('|');
            }
            break;
        case 'HANDLE_RECENT_SEARCH_CLICKED':
            newState.name = action.search;
            break;
        case 'HANDLE_SHOW_FIXED_CHANGE':
            console.log('handleshowfixedchange');
            newState.filters.showFixed = !newState.filters.showFixed;
            break;
        case 'HANDLE_FILTER_CHANGE':
            let temp = [];
            if (newState.filters.showFixed) {
                temp = newState.unMutableSearchResults.filter(result => result['project_type'] === 'fixed');
            } else {
                temp = newState.unMutableSearchResults.filter(result => result['project_type'] !== 'fixed');
            }
            newState.searchResults = [...temp];
            break;
        default:
            break;
    }

    return newState;
}

export default reducer;