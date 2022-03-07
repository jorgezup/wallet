const fetchAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};

const currenciesWithoutUSDT = async () => {
  const data = await fetchAPI();
  delete data.USDT;
  return data;
};

export async function getCurrenciesCode() {
  const currenciesObject = await currenciesWithoutUSDT();
  const data = Object.keys(currenciesObject);
  return data;
}

export async function getRates() {
  const data = await currenciesWithoutUSDT();
  return data;
}
