import axios from 'axios';
import React from 'react'

const useUserById = () => {

    const getUserById = async ({id}) => {

        console.log(id)

        const apiToken = localStorage.getItem('apiToken');
        try {
            const responce = await axios.get(`http://localhost:8080/api/v1/user/${id}`,{
                headers:{
                    Authorization: `Bearer ${apiToken}`
                }
            })
            console.log(responce);
            return responce;
            
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
  return {getUserById};
}

export default useUserById 