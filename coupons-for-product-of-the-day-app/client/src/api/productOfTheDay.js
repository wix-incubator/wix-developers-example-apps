import axios from 'axios';
import { SERVER_BASE_URL } from '../constants';

export const saveProductOfTheDay = ({
  discountPercentage,
  instance,
  productId,
}) => {
  return axios.post(`${SERVER_BASE_URL}/product`, {
    instance,
    discountPercentage,
    productId,
  });
};

export const getProductOfTheDay = (instance) => {
  return axios.get(`${SERVER_BASE_URL}/dashboard?instance=${instance}`);
};
