import React from 'react'
import Link from 'next/link'

const LoginUserDetails = () => {
  return (

    <>
      <div className='bg-gray-100 ml-20 my-10 flex justify-between p-3 '>
        <div>
           <h1 className='font-bold text-lg'>Welcome Guest!</h1>
           <p>Have! a Nice Day</p>
        </div>
       
        <div className='flex justify-between space-x-5 '>
             <p className=' text-xl'>|</p>
             <span>
                <Link href='/login'><button  className="text-blue-500 font-bold hover:underline underline-offset-4 my-1 cursor-pointer active:text-blue-200">SignIn</button></Link>
             {/* <h1>User Name </h1>
             <h1>role</h1> */}
             </span>
        </div>
      </div>
    </>
  )
}

export default LoginUserDetails