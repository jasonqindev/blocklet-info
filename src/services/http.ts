import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(
  (res) => res.data,
  function (error) {
    const { message: origin_message, response } = error;
    const { message } = response.data;

    if (message || origin_message) {
      alert(message || origin_message);
    }
    return Promise.reject(error);
  }
);

export default instance;
