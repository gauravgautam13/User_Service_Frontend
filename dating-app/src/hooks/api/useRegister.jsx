import axios from 'axios';
import React from 'react';

const useRegister = () => {

  const createUser = async (state) => {
    console.log(state)

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/signup", state);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { createUser };
};

export default useRegister;
