import { getCookie, setCookie } from '../cookie';
import { slice } from 'lodash';

const initialState = {
    name: '',
    searchResults: [],
    unMutableSearchResults: [],
    recentSearches: [],
    filters: {
        showFixed: true,
        showHourly: true,
        skills: {
            'laravel': false,
            'react': false,
            'web development': false,

        },

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
            newState.filters.showFixed = !newState.filters.showFixed;
            break;
        case 'HANDLE_SHOW_HOURLY_CHANGE':
            newState.filters.showHourly = !newState.filters.showHourly;
            break;
        // for handling hourly and fixed state change
        case 'HANDLE_FILTER_CHANGE':
            let temp = [];
            if (!newState.filters.showFixed && !newState.filters.showHourly) {
                temp = newState.unMutableSearchResults;
            }
            else if (newState.filters.showFixed && newState.filters.showHourly) {
                temp = newState.unMutableSearchResults;
            }
            else if (newState.filters.showHourly) {
                temp = newState.unMutableSearchResults.filter(result => result['project_type'] === 'hourly');
            }
            else if (newState.filters.showFixed) {
                temp = newState.unMutableSearchResults.filter(result => result['project_type'] === 'fixed');
            }
            newState.searchResults = [...temp];
            break;
        case 'HANDLE_SKILL_FILTER_CHANGE':
            newState.filters.skills[action.skill] = !newState.filters.skills[action.skill];
            break;
        // for handling skill filter change
        case 'HANDLE_SKILL_FILTER_STATE':
            temp = [];
            // checking if all skill filters are unchecked
            let trueCounter = 0;
            Object.values(newState.filters.skills).map(skillState => {
                if (skillState)
                {
                    trueCounter++;
                }
            });
            if (trueCounter === 0) {
                if (!newState.filters.showFixed && !newState.filters.showHourly) {
                    temp = newState.unMutableSearchResults;
                }
                else if (newState.filters.showFixed && newState.filters.showHourly) {
                    temp = newState.unMutableSearchResults;
                }
                else if (newState.filters.showHourly) {
                    temp = newState.unMutableSearchResults.filter(result => result['project_type'] === 'hourly');
                }
                else if (newState.filters.showFixed) {
                    temp = newState.unMutableSearchResults.filter(result => result['project_type'] === 'fixed');
                }
                newState.searchResults = [...temp];
                break;
            }
            // logic to change state according to skill filter
            Object.entries(newState.filters.skills).map(skill => {
               const skillName = skill[0];
               const state = skill[1];
                if (state)
                {
                    newState.searchResults.map(result => {
                        result['skills'].map(resultSkill => {
                            if (resultSkill['name'] === skillName)
                            {
                                if (!temp.includes(result))
                                temp.unshift(result);
                            }          
                        })
                    });
                }
            });
            newState.searchResults = [...temp];
            break;
        default:
            break;
    }

    return newState;
}

export default reducer;