import axios from 'axios';
import { HAS_BACKEND } from 'configurations';

export const getUbs = ({ params } = {}) => {
  if (HAS_BACKEND) {
    return axios('api/ubs', {
      method: 'POST',
      data: params,
    });
  }

  // not using backend
  if (params.city) {
    return axios(`http://api-ldc-hackathon.herokuapp.com/api/ubs/city`, {
      method: 'POST',
      data: { city: params.city, page: params.page },
    });
  }

  return axios.get(
    `http://api-ldc-hackathon.herokuapp.com/api/ubs/${params.page}`,
    {
      method: 'GET',
    },
  );
};
