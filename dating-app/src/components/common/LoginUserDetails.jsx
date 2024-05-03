import React, { useContext } from 'react'
import Link from 'next/link'
import { MyContext } from '@/utils/context/AuthProvider'

const LoginUserDetails = () => {

  const {loginUserDetails, isLogin} = useContext(MyContext);
  console.log(loginUserDetails)

  return (

    <>
      <div className= 'fixed top-1 bg-white right-5 w-4/5 border-black-800 border-1 shadow-md flex justify-between p-5 '>
        <div>
           <h1 className='font-bold text-xl'>Welcome {loginUserDetails?.data?.name || 'Guest'}</h1>
           <p className = 'text-base text-black'>Have! a Nice Day</p>
        </div>
       
        <div className='flex justify-between space-x-5 '>
             <p className='text-3xl'>|</p>
             <span>
              {isLogin ? <Link href='/profile'><svg xmlns="http://www.w3.org/2000/svg" width={20} className='mt-2 mr-2' viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></Link> :  <Link href='/login'><button  className="text-black text-lg font-semibold hover:underline underline-offset-4 my-2 mx-2 cursor-pointer active:text-red-800">Sign In</button></Link>}
             </span>
        </div>
      </div>
    </>
  )
}

export default LoginUserDetails