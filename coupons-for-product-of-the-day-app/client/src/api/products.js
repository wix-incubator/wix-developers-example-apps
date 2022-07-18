import axios from 'axios';
import { SERVER_BASE_URL } from '../constants';

export const searchProducts = ({ searchTerm, instance }) => {
  return axios.get(
    `${SERVER_BASE_URL}/search?term=${searchTerm}&instance=${instance}`,
  );
};
