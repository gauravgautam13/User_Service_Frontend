import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
   <>
   <div className='h-screen my-10 w-1/6 border-2 border-blue-500 shadow-2xl ml-10 bg-white'>
    <p className='text-black font-extrabold my-10 text-3xl text-center'>User Module</p>
    <div className='grid grid-cols-1 space-y-10 text-xl font-semibold'>
           <Link href='/' className='text-center'><button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >Dashboard</button></Link>
           <Link className='text-center' href='/user'><button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >User</button></Link>
           <button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >Documents</button>
           <button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >Photos</button>
           <button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >Hierarchy</button>
           <button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >Message</button>
           <button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >Help</button>
           <button className='text-black mx-2 hover:underline underline-offset-2 active:text-blue-500 hover:font-bold' >Setting</button>
    </div>
   </div>
   </>
  )
}

export default Header