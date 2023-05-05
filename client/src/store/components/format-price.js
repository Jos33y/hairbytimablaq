import he from 'he';

const localRate = JSON.parse(localStorage.getItem("rate"));

export const formatPrice = (price) => {
  return Number(price / localRate.rateAmount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatSymbol = () => {
  return he.decode(localRate.rateSymbol);
};
