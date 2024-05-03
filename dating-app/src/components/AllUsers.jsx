import useAllUsers from '@/hooks/api/useAllUsers'
import React, { useEffect, useState } from 'react'
import { useQuery  } from '@tanstack/react-query'
import apiCallerFunction from '@/service/ApiCallerFunction';

const AllUsers = () => {
    

    const {data, isError, isLoading, error} = useQuery({queryKey:'getAll-Users', queryFn: () => apiCallerFunction("GET","user/users")});

    if(isLoading){
       return <h1>Loadingggg</h1>
    }

    if(isError){
      console.log(error)
      return <h1>SomeThing went wrong!!!</h1>
    }


  return (

    <>
    <div className='ml-auto  mr-16 mt-52 w-3/4'>
    {data && data?.data?.map(i => {
        return (
          
            <div className='grid grid-cols-3 bg-white space-y-5 border border-slate-500 mt-1 p-4' key={i.id}>
                <h1>{i.name}</h1>
                <h2>{i.email}</h2>
                <h4>{i.role}</h4>
                <h5>{i.location}</h5>
                <h6>{i.gender}</h6>

            </div>
          
        )
    })}
      </div>
    </>
  )
}

export default AllUsers