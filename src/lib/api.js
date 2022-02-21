import { HOST } from '../lib/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class Api {
  static get(route, params) {
    return this.xhr(route, params, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static post(route, params, body) {
    return this.xhr(route, params, 'POST', body);
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static postForm(route, params) {
    return this.formData(route, params, 'POST');
  }

  static async multipPartPostRequest(route, params) {
    const url = `${HOST}${route}`
    const token = await AsyncStorage.getItem('@token');
    return axios
      .post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token ? token : ''}`,
        },
      }).then(resp => {
        return resp.data;
      }).catch(error => {
        if (error.response) {
          console.log('error.response', error.response)

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('error.request', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        throw error;
      });
  };

  static async xhr(route, params, verb, body = null) {
    const url = `${HOST}${route}`
    var options;
    if (body == null) {
      options = Object.assign({ method: verb }, params ? { params } : null);
    } else {
      options = Object.assign({ method: verb }, params ? { params } : null, { data: body });
    }
    const token = await AsyncStorage.getItem('@token');
    options.headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token ? token : ''}`,
    };
    return axios(url, options).then(resp => {
      return resp.data;
    }).catch(error => {
      if (error.response) {
        console.log('error.response', error.response)

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('error.request', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      throw error;
    })
  };
};

export default Api;
