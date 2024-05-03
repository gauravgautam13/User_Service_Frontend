'use client'
import React, { useReducer, useState } from 'react'
import { registerUserSchema } from '@/validation/registerUserSchema'
import * as yup from 'yup';
import apiCallerFunction from '@/service/ApiCallerFunction';
import { useMutation } from '@tanstack/react-query'
import Router from 'next/router'
import { useToast } from './ui/use-toast';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';

const UserRegistration = () => {
  const { toast } = useToast();


    const {mutate, data} = useMutation(
    {
      mutationFn: (newState) => apiCallerFunction("POST", 'auth/signup', {payload: newState}),
      onSuccess: (data) => {toast({title: "User Creterd!!", description: "Redirecting to Login Page..."}), setTimeout(() => Router.push('/login'),700)},
      onError: (error) => {console.log(errorResponce.data), toast({variant: "destructive", title: "Opps! Something went wrong!",action: <ToastAction altText="Try again" onClick={() => dispatch({ type: 'reset' })}>Try again</ToastAction>,
    })}

    }

  )



  const reducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
      case 'firstName': {
        return { ...state, firstName: payload };
      }      
      case 'secondName': {
        return { ...state, secondName: payload };
      }
      case 'email': {
        return { ...state, email: payload };
      }
      case 'username': {
        return { ...state, username: payload };
      }
      case 'mobile': {
        return { ...state, mobile: payload };
      }
      case 'date': {
        return { ...state, date: payload };
      }
      case 'password': {
        return { ...state, password: payload };
      }
      case 'gender': {
        return { ...state, gender: payload };
      }
      case 'location': {
        return { ...state, location: payload };
      }
      case 'reset': {
        return initialState
      }
      default: {
        return state;
      }
    }

  }

  const initialState = {
    email: "",
    username: "",
    mobile: "",
    date: "",
    password: "",
    gender: "",
    location: "",
    secondName: "",
    firstName: ""

  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await registerUserSchema.validate(state, { abortEarly: false });
      const {firstName, secondName} = state;
        const newState = state;
        newState.name = firstName + " " + secondName;
        console.log(newState);

      mutate(newState);
      console.log("check")
      dispatch({ type: 'reset' });
      setError({});
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setError(newErrors);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setError((prevErrors) => ({ ...prevErrors, [field]: '' }));
    dispatch({ type: field, payload: value });
  };




    const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
          dispatch({ type: 'location', payload: location });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }




  return (
    <>
      <div className='flex justify-center h-screen items-center bg-slate-100'>

        <form className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-2xl w-1/3 rounded-xl hover:border-2 border-slate-300 space-y-3" onSubmit={handleSubmit}>

          <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mr-4">Register here!</h1>

          <div className='space-y-5'>
            <div className='flex space-x-5'>
          <Label htmlFor="firstName" className='block text-sm font-medium leading-6 text-gray-900'>
          First Name:
            <Input className="" type="text" placeholder='Enter your Name' required id='firstName' value={state.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
            <p className='text-red-500 '>{error.firstName}</p>

          </Label>
          <Label htmlFor="secondName" className='block text-sm font-medium leading-6 text-gray-900'>
          Last Name:
            <Input className="" type="text" placeholder='Enter your Name' required id='secondName' value={state.secondName} onChange={(e) => handleInputChange('secondName', e.target.value)} />
            <p className='text-red-500 '>{error.secondName}</p>
          </Label>
          </div>
          
          <div className='flex space-x-4'>
          <Label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>
            Email:
            <Input className="" type="email" placeholder='Enter your Email' required id='email' value={state.email} onChange={(e) => handleInputChange('email', e.target.value)} />
            <p className='text-red-500 '>{error.email}</p>
          </Label>

          <Label htmlFor="username" className='block text-sm font-medium leading-6 text-gray-900'>
            User Name:
            <Input className="" type="text" placeholder='Enter your Name' required id='username' value={state.username} onChange={(e) => handleInputChange('username', e.target.value)} />
            <p className='text-red-500 '>{error.username}</p>
          </Label>
          </div>

          <div>
          <Label htmlFor="mobile" className='block text-sm font-medium leading-6 text-gray-900'>
            Contact No:
            <Input className="w-11/12" type="int" placeholder='Enter your Number' required id='mobile' value={state.mobile} onChange={(e) => handleInputChange('mobile', e.target.value)} />
          </Label>
          <p className='text-red-500 text-sm font-semibold'>{error.mobile}</p>
          </div>

          <div className='flex space-x-8'>
          <Label htmlFor="date" className='block text-sm font-medium leading-6 text-gray-900'>
            Date of Birth:
            <Input className="" required type="date" id="date" value={state.date} onChange={(e) => handleInputChange('date', e.target.value)} />
            <p className='text-red-500 text-xs'>{error.date}</p>
          </Label>

          <Label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
              Gender
            <br/>
            <select className='p-2 rounded-md w-28 border active:border-2 active:border-slate-400' name="gender" id="gender" value={state.gender} onChange={(e) => handleInputChange('gender', e.target.value)}>
              <option value=""></option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          <p className='text-red-500 ml-5'>{error.gender}</p>
            </Label>

          <Label htmlFor="location" className='block text-sm font-medium leading-6 text-gray-900 '>
            Location:
            <Input type='radio' id='location' value={state.location} onClick={getLocation} className=" m-2 h-5 w-5 rounded-full" onChange={(e) => handleInputChange('location', e.target.value)} />
          <p className='text-red-500 text-sm'>{error.location}</p>
          </Label>

          </div>

        <div>
          <Label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>
            Password:
            <Input className="w-11/12" type="password" placeholder='Enter your Password' required id='password' value={state.password} onChange={(e) => handleInputChange('password', e.target.value)} />
            <p className='text-red-500 '>{error.password}</p>
          </Label>
          </div>
          </div>

          <div>
          <button onClick={handleSubmit} className="w-11/12 active:text-slate-400 active:border-1 border-blue-500 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-4">Sign Up</button>
          </div>
          <h1 className="mt-10 text-center text-sm text-gray-500">Already! have Account <Link href={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2 hover:underline underline-offset-1 active:text-indigo-200"> Sign In!</Link></h1>

        </form>


      </div>

      

    </>
  )
}

export default UserRegistration;


