import { Image } from "@nextui-org/react";

export const BbLogo = ({width=72}) => (
  <>
  <div className="block dark:hidden">
  <Image 
    src="/images/logo/bb_logo.png"
    height="auto"
    width={width}
    alt="bb logo"
  />
  </div>
  <div className="hidden dark:block">
  <Image 
    src="/images/logo/bb_logo_white.png"
    height="auto"
    width={width}
    alt="bb logo"
  />
  </div>
  </>
);