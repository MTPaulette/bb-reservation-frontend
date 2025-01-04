import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { capitalize } from "@/lib/utils";
import { useSession } from "next-auth/react";


const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  const { data: session } = useSession();
  const permissions = session?.permissions;

  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item, index: number) => (
          <div key={index}>
            {!item.permissions ? (
              <li key={index}>
                <Link
                  href={item.route}
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-base text-foreground/50 duration-300 ease-in-out hover:text-whitee ${
                    pathname === item.route ? "text-foreground" : ""
                  }`}
                >
                  {capitalize(item.label)}
                </Link>
              </li>
            ) : (
              <>
                {item.permissions.some(permission =>
                  permissions.includes(permission)) && (
                  <li key={index}>
                    <Link
                      href={item.route}
                      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-base text-foreground/50 duration-300 ease-in-out hover:text-whitee ${
                        pathname === item.route ? "text-foreground" : ""
                      }`}
                    >
                      {capitalize(item.label)}
                    </Link>
                  </li>
                )}
              </>
            )}
          </div>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;

/*
  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-base text-foreground/50 duration-300 ease-in-out hover:text-whitee ${
                pathname === item.route ? "text-foreground" : ""
              }`}
            >
              {capitalize(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
*/