import NavLinks from "@/app/components/dashboard/Navlinks";
import Logout from "@/app/components/form/Logout";
import { BbLogo } from "@/app/components/BbLogo";

export default function SideNav() {
  return (
    <>
    <aside className="bg-background fixed h-screen hidden md:flex flex-col justify-between top-0 left-0 z-10 md:w-52 xl:w-64 overflow-scroll over-y px-3 py-4 md:px-2">
      <div>
        <div className="px-3">
          <BbLogo />
        </div>
        <div className="flex h-full flex-col mt-8 md:space-y-3">
          <NavLinks />
        </div>
      </div>
      <Logout />
    </aside>
    </>
  );
}