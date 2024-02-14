import { useMedia } from "react-use";
import Image from "next/image";

export function HandResponsiveImage() {
  const isWide = useMedia("(min-width: 768px)");
  return (
    <Image
      src="/images/Hand.png"
      width={isWide ? 624 : 288}
      height={isWide ? 367 : 192}
      alt="Picture of the hand"
    />
  );
}
