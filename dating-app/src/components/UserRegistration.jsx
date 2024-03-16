'use client'
import React, { useReducer, useState } from 'react'
import { registerUserSchema } from '@/validation/registerUserSchema'
import * as yup from 'yup';
import useRegister from '@/hooks/api/useRegister';

const UserRegistration = () => {
  const { createUser } = useRegister();



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

      await createUser(newState);
      console.log("check")
      dispatch({ type: 'reset' });
      setError({});
      alert('User validated successfully!');
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
      <div className='flex justify-center h-screen items-center bg-gradient-to-r from-violet-100 to-fuchsia-200'>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 space-y-4 w-1/3 h- border-4 border-blue-300 rounded-md bg-rose-100 p-4 shadow-2xl hover:bg-rose-100 text-black' >

          <h1 className='font-extrabold text-xl from-neutral-50'>Register!!!</h1>

          <label htmlFor="firstName" className='ml-4 text-base font-semibold '>
          FirstName:
            <input className='mx-2 border border-indigo-500 px-2' type="text" placeholder='Enter your Name' required id='firstName' value={state.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.firstName}</p>

          <label htmlFor="secondName" className='ml-4 text-base font-semibold '>
          LastName:
            <input className='mx-2 border border-indigo-500 px-2' type="text" placeholder='Enter your Name' required id='secondName' value={state.secondName} onChange={(e) => handleInputChange('secondName', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.secondName}</p>

          <label htmlFor="email" className='ml-4 text-base font-semibold'>
            Email:
            <input className='mx-2 border border-indigo-500 px-2' type="email" placeholder='Enter your Email' required id='email' value={state.email} onChange={(e) => handleInputChange('email', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.email}</p>

          <label htmlFor="username" className='ml-4 text-base font-semibold'>
            UserName:
            <input className='mx-2 border border-indigo-500 px-2' type="text" placeholder='Enter your Name' required id='username' value={state.username} onChange={(e) => handleInputChange('username', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.username}</p>



          <label htmlFor="mobile" className='ml-4 text-base font-semibold'>
            Contact No:
            <input className='mx-2 border border-indigo-500 px-2' type="int" placeholder='Enter your Number' required id='mobile' value={state.mobile} onChange={(e) => handleInputChange('mobile', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.mobile}</p>

          <label htmlFor="date" className='ml-4 text-base font-semibold'>
            Date of Birth:
            <input className='mx-2 border border-indigo-500 px-2' type="date" id="date" value={state.date} onChange={(e) => handleInputChange('date', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.date}</p>


          <label htmlFor="gender" className='ml-4 text-base font-semibold'>
            Gender:
            <select className='mx-2 border border-indigo-500 px-2' name="gender" id="gender" value={state.gender} onChange={(e) => handleInputChange('gender', e.target.value)}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
          <p className='text-red-500 ml-5'>{error.gender}</p>


          <label htmlFor="location" className='ml-4 text-base font-semibold'>
            Location:
            <input type='radio' id='location' value={state.location} onClick={getLocation} className="  ml-2 h-4 w-4 rounded-full" onChange={(e) => handleInputChange('location', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.location}</p>


          <label htmlFor="password" className='ml-4 text-base font-semibold'>
            Passord:
            <input className='mx-2 border border-indigo-500 px-2' type="password" placeholder='Enter your Password' required id='password' value={state.password} onChange={(e) => handleInputChange('password', e.target.value)} />
          </label>
          <p className='text-red-500 ml-5'>{error.password}</p>

          <button onClick={handleSubmit} className='bg-orange-300 w-1/4 rounded-lg text-lg font-semibold hover:bg-orange-400 focus:text-indigo-300'>Submit</button>

          <h1 className='font-bold'>Already! have Account <a href={'/login'} className="text-blue-500 hover:underline underline-offset-8 cursor-pointer active:text-blue-200"> Login In!</a></h1>

        </form>


      </div>

    </>
  )
}

export default UserRegistration;


