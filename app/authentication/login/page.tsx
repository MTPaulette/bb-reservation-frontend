import Image from "next/image";

export default function Login() {
  return (
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/images/home.png"
        width={1000}
        height={760}
        className="hiddenn md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-danger md:text-2xl dark:text-danger">
        Log in account
      </h1>
    </div>
  );
}