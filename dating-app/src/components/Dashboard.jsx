import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiCallerFunction from '@/service/ApiCallerFunction';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import UpdateUserForm from './UpdateUserForm';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { PopoverClose } from '@radix-ui/react-popover';

const Dashboard = () => {
    const [count, setCount] = useState(0);
    const queryClient = useQueryClient();

    const { data: allUser, isLoading, error, isError, refetch } = useQuery(
        {
            queryKey: ['get-user-by-pages', count],
            queryFn: () => apiCallerFunction("GET", `user/pagination/${count}/5/name`)
        }
    );

    useEffect(() => {
        refetch();
    }, [count]);

    const mutation = useMutation({
        mutationFn: (userId) => apiCallerFunction("DELETE", `user/${userId}`),

        onSuccess: () => {
            queryClient.invalidateQueries('get-user-by-pages'), toast({
                title: "User Deleted Succesfully!"

            });
        },
        onError: () => {
            console.log(error)
            toast({
                variant: 'destructive',
                title: "Opps! Deleted Failed"
            })
        }

    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };

    const handlePages = (input) => {
        switch (input) {
            case "dec":
                if (count >= 1) {
                    setCount(count - 1);
                }
                break;
            case "inc":
                if (allUser && count < allUser.data.totalPages - 1) {
                    setCount(count + 1);
                }
                break;
        }
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

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='ml-auto mr-4 mt-[12.7rem] w-4/5 bg-white h-3/4'>
            <h1 className='text-xl font-bold m-2 py-2 pl-2'>List Users</h1>
            <div className='bg-slate-50 text-black font-semibold text-xl p-3 grid grid-cols-5 '>
                <p className='ml-14'> Name </p>
                <p className='text-center'> Created At </p>
                <p className='text-center'> Role </p>
                <p className='text-center'> Gender</p>
                <p className='text-end mr-20'> Action</p>
            </div>

            {allUser && allUser.data.content.map(i => (
                <div key={i.id} className="grid grid-cols-5 space-x-2 space-y-4 border border-black-400 text-center p-2 underline-offset-1">
                    <div>
                        <h1 className='font-semibold mt-2'>{i.name}</h1>
                        <h2>{i.email}</h2>
                    </div>
                    <h3>{i.date}</h3>
                    <h4>{i.role}</h4>
                    <h5>{i.gender}</h5>
                    <div className='space-x-2'>

                        <><UpdateUserForm id={i.id} /></>

                        <Popover>
                            <PopoverTrigger>
                                <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <h1 className='font-bold text-sm'>Are You Sure!
                                    Want To Delete <p className='text-blue-400 underline'>{i.name} ?</p></h1>
                                <div className='space-x-2 m-2'>
                                    <Button className="bg-red-500 hover:bg-red-400" onClick={() => handleDelete(i.id)}>
                                        Yes
                                    </Button>
                                    <PopoverClose asChild>
                                        <Button>No</Button>
                                    </PopoverClose>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            ))}

            <div className='flex justify-center space-x-4 font-bold text-xl m-2 pb-2'>
                <Button className='' onClick={() => handlePages("dec")}>&lt; Previous</Button>
                <h1 className='border-2 px-2 border-black bg-gray-800 py-1 rounded-md text-white text-base'>{allUser ? `${count} of ${allUser.data.totalPages - 1}` : 'Loading...'}</h1>
                <Button className='' onClick={() => handlePages("inc")}> Next &gt; </Button>
            </div>
        </div>
    )
}

export default Dashboard;
