import useAllUsers from '@/hooks/api/useAllUsers'
import React, { useEffect, useState } from 'react'

const AllUsers = () => {
    
    const {getAllUsers} = useAllUsers();
    const [users, setUsers] = useState('');

    useEffect(() => {
        getAllUsers().then((res) => setUsers(res));
    },[])
    console.log(users)

  return (

    <>
    {users && users?.map(i => {
        return (
            <div className='grid grid-cols-3 gap-5 space-y-5 m-5 border border-black p-4' key={i.id}>
                <h1>{i.name}</h1>
                <h2>{i.email}</h2>
                <h4>{i.role}</h4>
                <h5>{i.location}</h5>
                <h6>{i.gender}</h6>

            </div>
        )
    })}
    </>
  )
}

export default AllUsers