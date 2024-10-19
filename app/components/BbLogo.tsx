import Image from "next/image";

export const BbLogo = ({width=72, height=72}) => (
  <Image src="/images/logo_bb.png" width={width} height={height} alt="bb logo"/>
);