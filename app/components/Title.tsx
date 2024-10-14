import clsx from 'clsx';

export default function Title({children, className}: {children: React.ReactNode, className: String }) {
  return (
    <h1 className={clsx("font-semibold text-2xl sm:text-3xl lg:text-4xl text-foreground", className )}> {children} </h1>
  );
};