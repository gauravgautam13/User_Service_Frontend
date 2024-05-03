import axios from 'axios'
import AxiosInstance from 'axios';
import React from 'react'


const apiCallerFunction =async (method, url, config = {}) => {
    let headers = {};
    const apiToken = localStorage.getItem('apiToken');
    const apiUrl = `http://localhost:8080/api/v1/${url}`;
    // console.log("before",apiUrl, config.payload);
    

    const mergedConfig = {
      method,
      url: apiUrl,
      data: config.payload || {},
      params: config.params || {},
    };

    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`;
    }

    if (url.includes('auth/')) {
      headers = {};
    }

    mergedConfig.headers = headers;

    console.log("before calling",mergedConfig);

    try {
      const response = await axios(mergedConfig);
      console.log("res from caller",response)
      return response;
      } catch (error) {
      console.error('API call error:', error);
    }
  };


export default apiCallerFunction