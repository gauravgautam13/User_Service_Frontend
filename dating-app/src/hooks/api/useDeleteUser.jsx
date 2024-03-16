import axios from 'axios'
import React from 'react'

const useDeleteUser = () => {

    const deleteUser = async ({id}) => {

        console.log(id);
        const apiToken = localStorage.getItem('apiToken');

        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/user/${id}`,{
              headers: {
                Authorization: `Bearer ${apiToken}`
              }
            });
            alert("user Deleted")
            window.location.reload()
              return "user Deleted";

        } catch (error) {
            console.log(error);
        }
    }
  return {deleteUser};
}

export default useDeleteUser