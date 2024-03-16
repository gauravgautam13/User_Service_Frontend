'use Client'
import Header from "@/components/common/Header";
import Dashboard from "@/components/Dashboard";
import LoginUserDetails from "@/components/common/LoginUserDetails";
import Search from "@/components/common/Search";
import AllUsers from "@/components/AllUsers";

export default function Home() {



  return (
    <>
    <div className="flex bg-gray-200">
    <Header />
    <div className="w-3/4">
    <LoginUserDetails/> 
    <Search />
    <AllUsers />
    </div>
  </div>
    </>

  );
}
 