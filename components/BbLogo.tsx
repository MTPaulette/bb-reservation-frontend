import Image from "next/image";

export const BbLogo = ({width=72}) => (
  <>
  <div className="block dark:hidden">
    <Image
      priority
      src="/images/logo/bb_logo.png"
      width={width}
      height={width}
      alt="bb logo"
      style={{
        // width: "auto",
        height: "auto",
      }}
    />
  </div>
  <div className="hidden dark:block">
    <Image
      priority
      src="/images/logo/bb_logo_white.png"
      width={width}
      height={width}
      alt="bb logo"
      style={{
        width: "auto",
        height: "auto",
      }}
    />
  </div>
  </>
);

