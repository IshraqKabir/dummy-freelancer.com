

const initialState = {
    name: '',
    searchResults: [],
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
        default:
            break;
    }

    return newState;
}

export default reducer;