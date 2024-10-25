export default function Alert({message, color}: {message: string, color: "default"|"warning"|"danger"|"success"}) {
  return (
    <div
      className={`flex p-3 text-sm border rounded-lg
        ${color === "default"? "text-zinc-800 border-zinc-300 bg-zinc-50 dark:bg-zinc-900/10 dark:text-zinc-300 dark:border-zinc-800" : " "}
        ${color === "warning"? "text-yellow-800  border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10 dark:text-yellow-300 dark:border-yellow-800" : " "}
        ${color === "danger"? "text-red-800  border-red-300 bg-red-50 dark:bg-red-900/10 dark:text-red-300 dark:border-red-800" : " "}
        ${color === "success"? "text-green-800  border-green-300 bg-green-50 dark:bg-green-900/10 dark:text-green-300 dark:border-green-800" : " "}
      `}
    >
      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
      <span className="sr-only">Info</span>
      <div>
        <h5 className="font-semibold text-base mb-0.5">
          { color === "default" || color === "success"? "Notes:" : "" }
          { color === "warning"? "Attention!" : "" }
          { color === "danger"? "Error:" : "" }
        </h5>
        <p>{message}</p>
      </div>
    </div>
  );
};