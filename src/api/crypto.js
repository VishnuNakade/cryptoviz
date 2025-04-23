import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchTopCoins = async () => {
  const res = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: true,
    },
  });
  return res.data;
};

export const fetchCoinDetail = async (id) => {
  const res = await axios.get(`${BASE_URL}/coins/${id}`);
  return res.data;
};
