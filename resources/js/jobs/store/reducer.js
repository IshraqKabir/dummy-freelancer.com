import { getCookie, setCookie } from '../cookie';

export const jobsPerPage = 1;

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
    },

};

function handleSkillFilterState (filters, searchResults) 
{
    let temp = [];
            // checking if all skill filters are unchecked
            // let trueCounter = 0;
            // Object.values(filters.skills).map(skillState => {
            //     if (skillState)
            //     {
            //         trueCounter++;
            //     }
            // });
            // // logic if all filters are unchecked
            // if (trueCounter === 0) {
            //     searchResults = fixedOrHourlyFilter(filters, newState.unMutableSearchResults);
            //     break;
            // }
            // logic to change state according to skill filter
            Object.entries(filters.skills).map(skill => {
               const skillName = skill[0];
               const state = skill[1];
                if (state)
                {
                    searchResults.map(result => {
                        result['skills'].map(resultSkill => {
                            if (resultSkill['name'] === skillName && !temp.includes(result))
                            {
                                temp.push(result);
                            }          
                        })
                    });
                }
            });

            return [...temp];
}

function fixedOrHourlyFilter(filters, unMutableSearchResults)
{
    let temp = [];
    if (!filters.showFixed && !filters.showHourly) {
        temp = unMutableSearchResults;
    }
    else if (filters.showFixed && filters.showHourly) {
        temp = unMutableSearchResults;
    }
    else if (filters.showHourly) {
        temp = unMutableSearchResults.filter(result => result['project_type'] === 'hourly');
    }
    else if (filters.showFixed) {
        temp = unMutableSearchResults.filter(result => result['project_type'] === 'fixed');
    }
    return temp;
}

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
            if (action.name !== '')
            {
                recentSearches = recentSearches.filter(item => item !== action.name);
                recentSearches = [action.name, ...recentSearches];
            }

            recentSearches = recentSearches.join('|')
            setCookie('recentSearches', recentSearches, 1);
            
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
            newState.searchResults = fixedOrHourlyFilter(newState.filters, newState.unMutableSearchResults);
            break;
        case 'HANDLE_SKILL_FILTER_CHANGE':
            newState.filters.skills[action.skill] = !newState.filters.skills[action.skill];
            break;
        // for handling skill filter change
        case 'HANDLE_SKILL_FILTER_STATE':
            // let temp = [];
            // checking if all skill filters are unchecked
            let trueCounter = 0;
            Object.values(newState.filters.skills).map(skillState => {
                if (skillState)
                {
                    trueCounter++;
                }
            });
            // logic if all filters are unchecked
            if (trueCounter === 0) {
                newState.searchResults = fixedOrHourlyFilter(newState.filters, newState.unMutableSearchResults);
                break;
            }
            // logic to change state according to skill filter
            // Object.entries(newState.filters.skills).map(skill => {
            //    const skillName = skill[0];
            //    const state = skill[1];
            //     if (state)
            //     {
            //         newState.searchResults.map(result => {
            //             result['skills'].map(resultSkill => {
            //                 if (resultSkill['name'] === skillName && !temp.includes(result))
            //                 {
            //                     temp.push(result);
            //                 }          
            //             })
            //         });
            //     }
            // });
            let temp = handleSkillFilterState(newState.filters, newState.unMutableSearchResults);
            newState.searchResults = [...temp];
            break;
        case 'ADD_SKILL_FILTER':
            console.log(action.suggestion);
            temp = {
                [action.suggestion]: true,
                ...newState.filters.skills
            }
            temp[action.suggestion] = true; 
            newState.filters.skills = {...temp}
            break;
        case 'PAGINATE':
            const endingPosition = jobsPerPage * action.pageNumber;
            const startingPosition = endingPosition - jobsPerPage;

            let filteredSearchedResults = [];
            // checking if all skill filters are unchecked
            trueCounter = 0;
            Object.values(newState.filters.skills).map(skillState => {
                if (skillState)
                {
                    trueCounter++;
                }
            });
            // logic if all filters are unchecked
            if (trueCounter === 0) {
                filteredSearchedResults = fixedOrHourlyFilter(newState.filters, newState.unMutableSearchResults);
            } else {
                filteredSearchedResults = handleSkillFilterState(newState.filters, newState.unMutableSearchResults);
            }

            temp = filteredSearchedResults.slice(startingPosition, endingPosition);
            newState.searchResults = [...temp];
            break;
        default:
            break;
    }

    return newState;
}

export default reducer;