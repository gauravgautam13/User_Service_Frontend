import React from 'react'
import axios from 'axios';

const useUsersByPages = () => {

    const getUsersByPages = async ({pageIndex}) => {

        let PageSize = 5;
        let field = 'name';
        const apiToken = localStorage.getItem('apiToken');


        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/pagination/${pageIndex}/${PageSize}/${field}`,{
                headers: {
                    Authorization: `Bearer ${apiToken}`                }
              });

              console.log(response);
            return response?.data;

        } catch (error) {
            console.log(error);
        }
    }
  return {getUsersByPages}
}

export default useUsersByPages