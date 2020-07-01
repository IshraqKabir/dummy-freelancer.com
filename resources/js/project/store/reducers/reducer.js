

const initialState = {
    name : {
        value: '',
        error: null,
        emptyError: null,
        length: 0,
        isVisited: false
    },
    details : {
        value: '',
        error: null,
        emptyError: null,
        length: 0,
        isVisited: false
    },
    skills : {
        value: [],
        error: null,
        isVisited: false
    },
    payment : {
        hourly: false,
        fixed: true,
        error: null,
        isVisited: false
    }
};


function reducer (state = initialState, action)
{
  const newState = {...state};

  switch (action.type)
  {
    case 'connected':
        console.log('connected from ' + action.componentName);
        break;
    case 'SELECT_HOURLY':
        newState.payment.hourly = true;
        newState.payment.fixed = false;
        break;
    case 'SELECT_FIXED':
        newState.payment.fixed = true;
        newState.payment.hourly = false;
        break;
    case 'SET_NAME':
        newState.name.value = action.value
        break;
    case 'SET_NAME_LENGTH':
        newState.name.length = action.value;
        break;
    case 'SET_NAME_ERROR':
        newState.name.error = action.value;
        break;
    case 'SET_NAME_EMPTY_ERROR':
        newState.name.emptyError = action.value;
        break;
    case 'SET_DETAILS':
        newState.details.value = action.value
        break;
    case 'SET_DETAILS_LENGTH':
        newState.details.length = action.value;
        break;
    case 'SET_DETAILS_ERROR':
        newState.details.error = action.value;
        break;
    case 'SET_DETAILS_EMPTY_ERROR':
        newState.details.emptyError = action.value;
        break;
    default:
        break;
  }

  return newState;
}

export default reducer;













