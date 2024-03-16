import axios from 'axios'
import React from 'react'

const useMultipart = () => {

  const uploadExcelFile = async (file) => {

    console.log(file);
    const apiToken = localStorage.getItem('apiToken');

    try {

      const formData = new FormData();
      formData.append('file', file);

      const responce = await axios.post("http://localhost:8080/api/v1/user/multipart", formData ,{
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      });
      return responce;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { uploadExcelFile };
}

export default useMultipart;