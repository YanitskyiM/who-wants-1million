import Image from "next/image";

export function HandResponsiveImage() {
  return (
    <div>
      <Image
        src="/images/Hand.png"
        width={624}
        height={367}
        layout="responsive"
        alt="Picture of the hand"
      />
    </div>
  );
}
