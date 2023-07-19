"use client";

import Image from "next/image";
import "./render.scss";
function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="post-image">
      <Image
        alt="image"
        className="object-contain"
        fill
        src={src}
      />
    </div>
  );
}

export default CustomImageRenderer;
