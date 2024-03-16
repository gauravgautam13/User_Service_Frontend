import axios from 'axios'
import React from 'react'

const useUpdateUser = () => {

    const updateUser = async (id, payload) => {
      const apiToken = localStorage.getItem('apiToken');
        console.log(id);
        console.log(payload);

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/user/${id}`,payload,{
              headers: {
                Authorization: `Bearer ${apiToken}`
              }
            });
            console.log("updated!!!");
              return response;

        } catch (error) {
            console.log(error);
        }
    }
  return {updateUser};
}

export default useUpdateUser