import { getCurrenciesCode, getExchangeCurrencies } from '../api';
import {
  GET_WALLET_ERROR,
  // GET_WALLET_SUCCESS,
  NEW_EXPENSE,
  REMOVE_EXPENSE,
  REQUEST_WALLET,
  SET_CURRENCIES,
} from './actionTypes';

const requestWallet = () => ({
  type: REQUEST_WALLET,
});

// const getWalletSuccess = (expenses) => ({
//   type: GET_WALLET_SUCCESS,
//   payload: expenses,
// });

const getWalletError = (error) => ({
  type: GET_WALLET_ERROR,
  payload: error,
});

export const addNewExpense = (expense) => ({
  type: NEW_EXPENSE,
  payload: expense,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  payload: id,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const fetchWallet = (expense) => async (dispatch) => {
  dispatch(requestWallet());
  try {
    const exchangeRates = await getExchangeCurrencies();
    dispatch(addNewExpense({ ...expense, exchangeRates }));
  } catch (error) {
    dispatch(getWalletError(error.message));
  }
};

export const fetchCurrenciesCode = () => async (dispatch) => {
  const currencies = await getCurrenciesCode();
  dispatch(setCurrencies(currencies));
};
