import axios from 'axios';

export const getUbs = ({ params } = {}) => {
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

// our
// export const getUbs = ({ params } = {}) =>
//   axios.get('api/ubs', {
//     method: 'POST',
//     params,
//   });
