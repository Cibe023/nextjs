import React from "react";

interface PinterestCardProps {
  title: string;
  pinUrl: string;
  width: number;
  height: number;
}

export default function PinterestCard({ title, pinUrl, width, height }: PinterestCardProps) {
  const paddingBottom = `${(height / width) * 100}%`;

  return (
    <div
      className="bg-black rounded-lg shadow-md p-4"
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
      <div className="relative" style={{ width: "100%", paddingBottom }}>
        <iframe
          src={pinUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full rounded"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}