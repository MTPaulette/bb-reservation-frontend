// import Image from "next/image";
// export const BbLogo = ({height=72, width=72}) => (
//   <div className="w-auto h-auto flex items-center justify-center">
//     <Image src="/images/logo_bb.png" width={width} height={height} alt="bb logo" />
//   </div>
// );

import Image from "next/image";
export const BbLogo = ({width=72, height=72}) => (
  <Image src="/images/logo_bb.png" width={width} height={height} alt="bb logo"/>
);