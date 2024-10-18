import clsx from 'clsx';

export default function Title({children, className}: {children: React.ReactNode, className: string }) {
  return (
    <h1 className={clsx("font-semibold text-foreground", className )}> {children} </h1>
  );
};

// text-2xl sm:text-3xl lg:text-4xl