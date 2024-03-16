import React, {useState, useEffect} from 'react';
import useDeleteUser from '@/hooks/api/useDeleteUser';
import useUsersByPages from '@/hooks/api/useUsersByPages';
import Link from 'next/link';

const Dashboard = () => {

    const {getUsersByPages} = useUsersByPages();
    const {deleteUser} = useDeleteUser();
    const [allUser, setAllUser] = useState(null);
    const [count, setCount] = useState(0);
  
  
    useEffect(() => {
        getUsersByPages({ pageIndex: count }).then((data) =>setAllUser(data));
    },[count])

    console.log(allUser)

    const handlePages = (input) => {
        switch (input) {
            case "dec":
                if (count >= 1){
                    setCount(count - 1);
                }
                break;
            case "inc":
                if (allUser && count < allUser.totalPages - 1){
                    setCount(count + 1);
                }                
                break;
        }
    }
  
  return (
   <>
   <div className='ml-20 mt-10 bg-white'>

   <h1 className='text-xl font-bold m-2 py-2'>List Users</h1>
    <div className='bg-slate-100 text-black font-semibold text-xl p-3 grid grid-cols-5 '>
    <p className='ml-14'> Name </p>
    <p className='text-center'> Created At </p>
    <p className='text-center'> Role </p>
    <p className='text-center'> Gender</p>
    <p className='text-end mr-20'> Action</p>
    </div>

    {allUser &&  allUser.content?.map(i => {
      return(
        <div key={i.id} className="grid grid-cols-5 space-x-2 space-y-4 border border-black-400 text-center p-2">
          <div>
            <h1 className='font-semibold mt-2'>{i.name}</h1>
            <h2>{i.email}</h2>
            </div>
          <h3>{i.date}</h3>
          <h4>{i.role}</h4>
          <h5>{i.gender}</h5>
          <div className='space-x-2'>
          <Link href={`/updateuser?id=${i.id}`}><button className="bg-blue-500 p-1 px-2 rounded-md " >
              Edit
            </button></Link>
            <button className="bg-red-400 p-1 px-1 rounded-md "  onClick={() => deleteUser({id: i.id})}>
            Delete
            </button>
            </div>
            
        </div>
    )
        })}

    <div className='flex justify-center space-x-4 font-bold text-xl m-5 pb-2'>
      <button onClick={() => handlePages("dec")}>&lt;</button>
      <h1>{allUser ? `${count} of ${allUser.totalPages - 1}` : 'Loading...'}</h1> 
      <button onClick={() => handlePages("inc")}>&gt;</button>
    </div>
    

   </div>
   </>
  )
}

export default Dashboard