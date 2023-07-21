'use client';

import Image from 'next/image';
import './render.scss';
function CustomImageRenderer({ data }: any) {
  const url = data.file.url;

  return (
    <div className="post-image">
      <div className="img" style={{ backgroundImage: `url(${url})` }}></div>
    </div>
  );
}

export default CustomImageRenderer;
