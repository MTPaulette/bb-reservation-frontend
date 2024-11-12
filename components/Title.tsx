import clsx from 'clsx';

export default function Title({children, className}: {children: React.ReactNode, className: string|undefined }) {
  return (
    <h1 className={clsx("font-semibold text-foreground tracking-wider", className )}> {children} </h1>
  );
};

// text-2xl sm:text-3xl lg:text-4xl