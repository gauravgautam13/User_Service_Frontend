import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import Router from 'next/router'

const UseLogin = () => {

    const UserLogin = async (payload) => {
        console.log(payload)
        try {
            const responce = await axios.post("http://localhost:8080/api/v1/auth/signIn", payload);
            console.log(responce);
            localStorage.setItem('apiToken', responce.data.token);
            alert("Login successful!!!")
            Router.push('/');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
  return {UserLogin}
}

export default UseLogin