// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET = 'WALLET';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const userData = (payload) => ({
  type: USER,
  payload,
});

export const walletData = (payload) => ({
  type: WALLET,
  payload,
});

export const newExpense = (expense) => ({
  type: NEW_EXPENSE,
  newExpense: expense,
});

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});
