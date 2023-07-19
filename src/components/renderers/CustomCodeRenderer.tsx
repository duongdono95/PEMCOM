"use client";
import "./render.scss";
function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="post-code">
      <code className="text">{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;
