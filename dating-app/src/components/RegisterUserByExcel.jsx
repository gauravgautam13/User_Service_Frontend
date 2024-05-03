import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import apiCallerFunction from '@/service/ApiCallerFunction';
import React, { useState } from 'react';
import Router from 'next/router';
import {useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "./ui/use-toast";


export default function RegisterUserByExcel() {
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    {
      mutationFn: (formData) => {
        setIsLoading(true);
        return apiCallerFunction('POST', 'user/multipart', { payload: formData });
      },
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries('get-user-by-pages');
        toast({ title: 'User Added Successfully!' });
      },
      onError: (error) => {
        console.error(error);
        toast({ title: "Something Went Wrong!", description: { error } });
      }
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload User By Excel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input type="file" placeholder='Upload Your Excel File' onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
