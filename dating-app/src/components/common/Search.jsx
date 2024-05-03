import React from 'react'
import Link from "next/link";
import RegisterUserByExcel from '../RegisterUserByExcel';
import { Button } from '../ui/button';
import { Input } from '../ui/input';


const Search = () => {
  return (
    <>
    <div className='ml-24 fixed top-24 py-4 right-5 w-4/5 bg-slate-50 pl-2'>
        <h1 className='font-bold text-xl text-black m-2 '>User Dashboard</h1>
        <div className='flex justify-between'>
            <form onSubmit="" className='flex justify-center space-x-5'>
            <Input type="search" placeholder='Search User' className='w-80' />
             <Button className='bg-slate-900'>Search</Button>
            </form>
            {/* <Link href='/uploadfile'><button className='bg-blue-500 p-1 hover:underline underline-offset-4 active:bg-blue-300 mr-10 rounded-md'>Add User By Excel</button></Link> */}
            <RegisterUserByExcel />
        </div>
    </div>
    </>
  )
}

export default Search