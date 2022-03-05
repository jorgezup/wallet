// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET = 'WALLET';

export const userData = (data) => ({
  type: 'USER',
  payload: data,
});

export const walletData = (data) => ({
  type: 'WALLET',
  payload: data,
});
