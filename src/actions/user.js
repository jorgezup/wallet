import { USER_LOGIN } from './actionTypes';

export default userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});
