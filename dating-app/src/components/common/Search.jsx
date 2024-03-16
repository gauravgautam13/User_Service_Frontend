import React from 'react'
import Link from "next/link";


const Search = () => {
  return (
    <>
    <div className='ml-24'>
        <h1 className='font-extrabold text-2xl text-blue-500 mb-4'>User Dashboard</h1>
        <div className='flex justify-between  '>
            <form onSubmit="" className='flex justify-between gap-5'>
            <input type="search" placeholder='Search User' className='px-5 rounded-lg border border-black hover:bg-gray-200 active:border-2 active:border-blue-500 w-80'  />
             <button className='bg-blue-500 p-1 rounded-md hover:underline underline-offset-4 active:bg-blue-300'>Search</button>
            </form>
            <Link href='/uploadfile'><button className='bg-blue-500 p-1 hover:underline underline-offset-4 active:bg-blue-300 mr-10 rounded-md'>Add User By Excel</button></Link>
        </div>
    </div>
    </>
  )
}

export default Search