import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiCallerFunction from '@/service/ApiCallerFunction';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from './ui/use-toast';

const UpdateUserForm = ({ id }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [initialUserDetails, setInitialUserDetails] = useState({});
  console.log(initialUserDetails);

  const { data, isLoading, isError, error, refetch } = useQuery(
    {
      queryKey: ['get-user-by-id', id],
      queryFn: () => apiCallerFunction('GET', `user/${id}`),

      enabled: !!id,
      initialData: null,
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data)
      setInitialUserDetails(data.data);
    }
  }, [data]);


  const queryClient = useQueryClient();

  const { mutate, data: successData, isPending } = useMutation(
    {
      mutationFn: (data) => apiCallerFunction("PUT", `user/${id}`, { payload: data }),
      onSuccess: (successData) => {
        queryClient.invalidateQueries('get-user-by-pages'),
          toast({
            title: "User Upadated SuccessFully",
            description: "Redirecting to Home Page....",
          });
      },
      onError: (error) => {
        console.log(error), toast({
          variant: "destructive",
          title: "Opps! Failed Updataion",
          action: <ToastAction altText="Try again" onClick={() => reset()}>Try again</ToastAction>,

        })
      }
    }
  )


  const onSubmit = () => {
    mutate(initialUserDetails);
  };

  const handleChange = (e) => {
    setInitialUserDetails({
      ...initialUserDetails,
      [e.target.id]: e.target.value,
    });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.log(error);
    return (
      <div className='w-1/4 fixed right-2 bottom-2 '>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something Went Wrong!!!
          </AlertDescription>
        </Alert>
      </div>);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-blue-500 hover:bg-blue-400">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                value={initialUserDetails.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={initialUserDetails.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter Your UserName"
                value={initialUserDetails.username}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className=" ml-4">
                Gender
              </Label>
              <select className='p-1 rounded-md border active:border-2 active:border-slate-400 w-60' name="gender" id="gender" value={initialUserDetails.gender} onChange={handleChange}>
                <option value=""></option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label htmlFor="date" className="text-right">
                Date Of Birth
              </Label>
              <Input
                type="date"
                id="date"
                placeholder="Enter Your Name"
                value={initialUserDetails.date}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label htmlFor="mobile" className="text-right">
                Mobile No.
              </Label>
              <Input
                type=""
                id="mobile"
                placeholder="Enter Your Number"
                value={initialUserDetails.mobile}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className="mr- w-1/2">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateUserForm;
