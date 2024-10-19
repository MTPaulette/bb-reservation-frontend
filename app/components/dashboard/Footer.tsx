"use client";

import { Link, Divider } from "@nextui-org/react";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Terms & Conditions", href: "/terms"},
    { name: "Privacy Policy", href: "/policy"},
  ];


  return (
    <footer className="mt-14 pt-6 pb-3 text-foreground/60">
      <Divider className="my-2 lg:my-8" />
      {/* <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between"> */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="sm:text-center text-small">
          © { new Date().getFullYear() } <span className="pointer-events-none">Brain-Booster™</span>. Tous droits réservés.
        </span>
        <ul className="flex mt-1 lg:mt-4 justify-end space-x-6 sm:justify-center sm:mt-0">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mb-2"
            >
              <Link
                href={item.href} color={pathname === item.href ? "warning" : "foreground"}
                size="sm" aria-current={pathname === item.href ? "page" : "false"}
              >{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

{/* <template>
  <div class="w-full border-t-2 mt-14 px-8 pt-6 pb-3 lg:flex justify-between items-center text-sm text-gray-600 sm:text-center dark:text-gray-400">
    <p>
      © {{ new Date().getFullYear() }} <span class="pointer-events-none">Brain-booster™</span>. All rights reserved.
    </p>
    <!-- <p class="mb-2 lg:mb-0">© Copyright 2020</p> -->

    <div class="flex">
      <a href="#" class="mr-6 hover:text-black">Terms of Service</a>
      <a href="#" class="mr-6 hover:text-black">Privacy Policy</a>
      <a href="https://www.brain-booster.net" target="_blank" class="hover:text-black">About</a>
    </div>
  </div>
</template> */}
