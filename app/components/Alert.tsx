import clsx from 'clsx';

export default function Alert({message, className}: {message: string, className: string|undefined }) {
  return (
    <div className={clsx("flex p-3 my-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 dark:text-yellow-300 dark:border-yellow-800", className )} role="alert">
      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
      <span className="sr-only">Info</span>
      <div>
        <h5 className="font-bold text-base mb-1">Notes:</h5>
        <p>{message}</p>
      </div>
    </div>
  );
};