// Home.js
import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Dashboard from "@/components/Dashboard";
import LoginUserDetails from "@/components/common/LoginUserDetails";
import Search from "@/components/common/Search";

export default function Home() {
  return (
    <div className="flex bg-gray-50">
      <Header />
      <LoginUserDetails />
      <Search />
      <Dashboard />
    </div>
  );
}
