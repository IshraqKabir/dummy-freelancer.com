

const initialState = {
    name : {
        value: '',
        error: null,
        isVisited: false
    },
    details : {
        value: '',
        error: null,
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
    default:
        break;
  }

  return newState;
}

export default reducer;













