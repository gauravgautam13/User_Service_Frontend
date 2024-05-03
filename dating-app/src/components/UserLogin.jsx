import Router from 'next/router'
import React from "react";
import { useForm } from "react-hook-form";
import apiCallerFunction from '@/service/ApiCallerFunction';
import { useContext } from "react";
import { MyContext } from "@/utils/context/AuthProvider";
import UseLogin from "@/hooks/api/UseLogin";
import { useMutation } from '@tanstack/react-query'
import { useToast } from './ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import Link from 'next/link';



function UserLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { toast } = useToast();

  const { setLoginUserId } = useContext(MyContext);


  const { mutate, data: successData, isPending, isError, error } = useMutation(
    {
      mutationFn: (data) => apiCallerFunction("POST", "auth/signIn", { payload: data }),
      onSuccess: (successData) => {
        localStorage.setItem('apiToken', successData.data.token);
        setLoginUserId(successData.data.id);
        toast({
          title: "Welcome! Login SuccessFull",
          description: "Redirecting to Home Page....",
        });
        setTimeout(() => Router.push('/'), 500)
      },
      onError: (error) => {
        console.log(error), toast({
          variant: "destructive",
          title: "Opps! Something Went wrong",
          action: <ToastAction altText="Try again" onClick={() => reset()}>Try again</ToastAction>,

        })
      }
    }
  )


  const onSubmit = (data) => {
    mutate(data);
  };



  return (
    // <main className='flex justify-center h-screen items-center bg-gradient-to-r  from-red-50 to-blue-400'>
    // <form className="p-6 space-y-6 bg-gradient-to-r from-blue-200 to-violet-300 font-semibold border-2 border-black text-black grid grid-cols-1 w-1/4 h-auto rounded-lg hover:shadow-2xl shadow-black"  onSubmit={handleSubmit(onSubmit)}>
    //   <h2 className="font-extrabold text-2xl text-center font-serif">Login!! To Your Account</h2>

    //   <label htmlFor="username" className="ml-2 text-xl font-sans" >UserName:
    //   <input className="py-2 px-3 mt-2 mr-1 w-80 border border-violet-700 rounded-xl"
    //     type="username"
    //     id="username"
    //     placeholder="Enter your username"
    //     {...register("username", { required: "Email is required" })}
    //   /> </label>

    //   {errors.username && <span className="text-red-400 ml-4">{errors.username.message}</span>}

    //   <label htmlFor="password" className="ml-2 text-xl font-sans">Password:
    //    <input className=" py-2 px-3 mt-2 mr-1 w-80 border border-violet-700 rounded-xl"
    //     type="password"
    //     id="password"
    //     placeholder="Enter your password"        
    //     {...register("password", { required: "Password is required" })}
    //   /> </label>

    //   {errors.password && <span className="text-red-400 ml-4">{errors.password.message}</span>}

    //   <button type="submit" className="ml-20 bg-blue-700 text-white hover:bg-blue-400 hover:font-bold hover:text-black border border-black active:text-gray-300 p-2 rounded-lg w-40" >Login</button>

    //   <h1 className="text-center">Don't have an Account <a href={'/signup'} className="text-blue-500 hover:underline underline-offset-8 cursor-pointer active:text-blue-200"> Sign Up!</a></h1>
    // </form>
    // </main>

<main className='flex items-center justify-center h-screen bg-slate-100'>
    <div className="flex h-2/3 flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-2xl w-1/3 rounded-xl hover:border-2 border-slate-300 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label for="username" className="block text-sm font-medium leading-6 text-gray-900">User Name:</label>
            <div className="mt-2">
              <input type="username"
                id="username"
                placeholder="Enter your username"
                {...register("username", { required: "Email is required" })} className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            {errors.username && <span className="text-red-500 ml-4 mt-2">{errors.username.message}</span>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })} className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            {errors.password && <span className="text-red-500 ml-4 mt-2">{errors.password.message}</span>}
          </div>

          <div>
            <button type="submit" className="active:text-slate-400 active:border-1 border-blue-500 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link href={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2 hover:underline underline-offset-1 active:text-indigo-200">Sign Up</Link>
        </p>
      </div>
    </div>
    </main>
  );
}

export default UserLogin;