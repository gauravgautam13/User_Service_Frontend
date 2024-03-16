'use Client'
import useAllUsers from "@/hooks/api/useAllUsers";
import useDeleteUser from "@/hooks/api/useDeleteUser";
import {useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Dashboard from "@/components/Dashboard";
import LoginUserDetails from "@/components/common/LoginUserDetails";
import Search from "@/components/common/Search";

export default function Home() {



  return (
    <>
    <div className="flex bg-gray-200">
    <Header />
    <div className="w-3/4">
    <LoginUserDetails/> 
    <Search />
    <Dashboard />
    </div>
  </div>
    </>

  );
}
 