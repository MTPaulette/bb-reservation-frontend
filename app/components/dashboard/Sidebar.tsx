import Navbar from "@/app/components/dashboard/Navbar";
import NavLinks from "@/app/components/dashboard/Navlinks";
import Logout from "@/app/components/form/Logout";
import { signIn } from "next-auth/react";

export default function SideNav() {
  return (
    <>
    <Navbar />
    <aside className="fixed hidden md:block top-0 left-0 z-10 md:w-52 xl:w-64 h-screen overflow-scroll over-y pt-16">
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <div className="flex grow flex-col my-4 md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md md:block"></div>
          <Logout />


          
          <div className="my-4 bg-yellow-200">
            <button onClick={() => {signIn(undefined, {callbackUrl: "/about"})}}>Sign In</button>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}