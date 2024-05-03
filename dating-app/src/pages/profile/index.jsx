import { MyContext } from '@/utils/context/AuthProvider'
import React, { useContext } from 'react'
import Router from 'next/router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';


const index = () => {

    const {loginUserDetails, setLoginUserId, setIsLogin} = useContext(MyContext);

    const handleLogOut = () => {
        localStorage.setItem('apiToken',null);
        setLoginUserId(null);
        setIsLogin(null);
        Router.push('/');
    }
  return (
    <>
     <div className='flex items-center justify-center h-screen '>


<Card className='w-1/4'>
  <CardHeader>
    <CardTitle>User Info</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>

  <div className='font-bold text-base space-x-5 space-y-5'>
  <h1 className='ml-5'> Name:- {loginUserDetails?.data?.name}</h1>
  <h1> User Name: - {loginUserDetails?.data?.username}</h1>
  <h1> Email:- {loginUserDetails?.data?.email}</h1>
  <h1> Gender:- {loginUserDetails?.data?.gender}</h1>
  <h1>Role:- {loginUserDetails?.data?.role}</h1>
  <h1> Address:- {loginUserDetails?.data?.location}</h1>
  <h1> Contact No:- {loginUserDetails?.data?.mobile}</h1>
    </div>

      </CardContent>
  <CardFooter>
  <Button className='ml-5' onClick={() => handleLogOut()}>LogOut</Button>
  </CardFooter>
</Card>
</div>


 

    </>
    )
}

export default index