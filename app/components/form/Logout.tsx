import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
// import { signOut } from '@/auth';

export default function Logout() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/reservations"})}
      className="flex h-[48px] md:h-[36px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-danger/20 text-danger md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div>Sign Out</div>
    </button>
  );
}


/*
<form action="#"
action={async () => {
  'use server';
    await signOut();
  }}
>
<button onClick={() => signOut()}
  className="flex h-[48px] md:h-[36px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-danger/20 text-danger md:flex-none md:justify-start md:p-2 md:px-3"
>
  <PowerIcon className="w-6" />
  <div>Sign Out</div>
</button>
</form> */