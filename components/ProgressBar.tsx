"use client"

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


export default function ProgressBarComponent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color="#22dd51" //"#29d" //"#0B9444"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};