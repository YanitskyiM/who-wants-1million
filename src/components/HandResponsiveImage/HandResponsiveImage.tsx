import React from 'react';
import Image from 'next/image';

function HandResponsiveImage() {
  return (
    <div>
      <Image
        src="/images/Hand.png"
        width={624}
        height={367}
        priority
        layout="responsive"
        alt="Picture of the hand"
      />
    </div>
  );
}

export default HandResponsiveImage;
