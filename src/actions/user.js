import { USER_LOGIN, UPDATE_USER } from './actionTypes';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const updateUser = (email) => ({
  type: UPDATE_USER,
  payload: email,
});
