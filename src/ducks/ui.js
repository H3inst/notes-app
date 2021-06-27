import { errorAlert } from '../components/alerts/alerts';

const INITIAL_STATE = {
  loading: false,
  msgError: null,
  checking: false,
};
// Types
const UI_SET_ERROR = 'UI_SET_ERROR';
const UI_REMOVE_ERROR = 'UI_REMOVE_ERROR';

const UI_SET_LOADING = 'UI_SET_LOADING';
const UI_FINISH_LOADING = 'UI_FINISH_LOADING';

const UI_SET_CHECKING = 'UI_SET_CHECKING';
const UI_FINISH_CHECKING = 'UI_FINISH_CHECKING';

// Reducer
export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UI_SET_ERROR:
      return {
        ...state,
        msgError: action.payload,
      };

    case UI_REMOVE_ERROR:
      return {
        ...state,
        msgError: null,
      };

    case UI_SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case UI_FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case UI_SET_CHECKING:
      return {
        ...state,
        checking: true,
      };

    case UI_FINISH_CHECKING:
      return {
        ...state,
        checking: false,
      };

    default:
      return state;
  }
}

// Actions
export const setError = (err) => {
  errorAlert(err);
  return {
    type: UI_SET_ERROR,
    payload: err,
  };
};

export const removeError = () => {
  return {
    type: UI_REMOVE_ERROR,
  };
};

export const setLoading = () => {
  return {
    type: UI_SET_LOADING,
  };
};

export const finishLoading = () => {
  return {
    type: UI_FINISH_LOADING,
  };
};

export const setChecking = () => {
  return {
    type: UI_SET_CHECKING,
  };
};

export const finishChecking = () => {
  return {
    type: UI_FINISH_CHECKING,
  };
};
