import apiCallerFunction from '@/service/ApiCallerFunction';
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import {useQuery} from '@tanstack/react-query'

export const MyContext = createContext();


const AuthProvider = ({children}) => {


    const [loginUserId, setLoginUserId] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    console.log(loginUserId);

    const { data: loginUserDetails, isError, isLoading, error } = useQuery(
      {
        querykey: ['LoginUserDetail', loginUserId],
        queryFn: () => apiCallerFunction('GET', `user/${loginUserId}`),
        enabled: !!loginUserId,
        initialData: null,
    }
    );

    useEffect(() => {
      if (loginUserDetails) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }, [loginUserDetails]);

  return (
    <MyContext.Provider value={{loginUserDetails, setLoginUserId, isLogin, setIsLogin }}>
      {children}
    </MyContext.Provider>
    )
}

export default AuthProvider