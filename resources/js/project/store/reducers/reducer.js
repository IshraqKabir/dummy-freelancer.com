

const initialState = {
    name : {
        value: '',
        error: null,
        emptyError: null,
        length: 0,
        visited: 0
    },
    details : {
        value: '',
        error: null,
        emptyError: null,
        length: 0,
        visited: 0
    },
    skills : {
        selectedSkills: [],
        visited: 0
    },
    payment : {
        hourly: false,
        fixed: true,
        currencyType: 'USD',
        minBudget: null,
        maxBudget: null,
        error: null,
        // visited: 0
    },
    nextButtonDisable: true,
    nextClicked: 0
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
    case 'SET_SELECTED_SKILLS':
        newState.skills.selectedSkills = action.value;
        break;
    case 'SELECT_CURRENCY_TYPE':
        newState.payment.currencyType = action.value;
        break;
    case 'SELECT_MIN_BUDGET':
        newState.payment.minBudget = action.value;
        break;
    case 'SELECT_MAX_BUDGET':
        newState.payment.maxBudget = action.value;
        break;
    case 'VISIT_NAME':
        newState.name.visited++;
        break;
    case 'VISIT_DETAILS':
        newState.details.visited++;
        break;
    case 'VISIT_SKILLS':
        newState.skills.visited++;
        break;
    case 'NEXT_BUTTON_CLICK':
        newState.nextClicked++;
        break;
    case 'SET_NEXT_BUTTON_STATE':
        if (newState.nextClicked === 0)
        {
            if (
            newState.name.length === 0 ||
            newState.name.length > 255 ||
            newState.details.length === 0 ||
            newState.details.length > 4000
            ) {
                newState.nextButtonDisable = true;
                break;
            }
            else {
                newState.nextButtonDisable = false;
                break;
            }
        } 
        else if (newState.nextClicked === 1)
        {
        if (
            newState.name.length === 0 ||
            newState.name.length > 255 ||
            newState.details.length === 0 ||
            newState.details.length > 4000 ||
            newState.skills.selectedSkills.length === 0 ||
            newState.skills.selectedSkills.length > 3 
        ) {
            newState.nextButtonDisable = true;
            break;
            }
            else {
                newState.nextButtonDisable = false;
                break;
            }
        }
        break;
    case 'DISABLE_NEXT_BUTTON':
        newState.nextButtonDisable = true;
        break;
    default:
        break;
  }

  return newState;
}

export default reducer;













