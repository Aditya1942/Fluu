import axios from 'axios';
const URLLOCAL = 'http://192.168.1.172:80/fluu';
const URL = 'https://mighty-bastion-04883.herokuapp.com';
const instance = axios.create({
  baseURL: URLLOCAL,
  validateStatus: function (status) {
    return status >= 200 && status <= 500; // default
  },
});
export const CancelToken = axios.CancelToken;

export default instance;

// https://mighty-bastion-04883.herokuapp.com
// http://192.168.1.172:4000
