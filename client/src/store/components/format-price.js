import he from 'he';

const localRate = JSON.parse(localStorage.getItem("rate"));

export const formatPrice = (price) => {
  return Number(price / (localRate ? localRate.rateAmount : 1)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatSymbol = () => {
  return he.decode(localRate ? localRate.rateSymbol : '&#393;');
};
 