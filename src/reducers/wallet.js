// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_WALLET,
  GET_WALLET_ERROR,
  GET_WALLET_SUCCESS,
  NEW_EXPENSE,
  SET_CURRENCIES,
  REMOVE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_WALLET:
    return {
      ...state,
      isFetching: true,
    };
  case GET_WALLET_SUCCESS:
    return {
      ...state,
      isFetching: false,
    };
  case GET_WALLET_ERROR:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload,
    };
  case NEW_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case SET_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
