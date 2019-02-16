import axios from 'axios';
import { API_PREFIX } from './constants';

export const getUbs = ({ params } = {}) =>
  axios.get(`http://api-ldc-hackathon.herokuapp.com/api/ubs/${params.page}`, {
    method: 'GET',
  });
