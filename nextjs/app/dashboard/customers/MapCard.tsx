import React from "react";

interface MapCardProps {
  title: string;
  mapUrl: string;
}

export default function MapCard({ title, mapUrl }: MapCardProps) {
  return (
    <div className="bg-black rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
      <div className="w-full aspect-[4/3]">
        <iframe
          src={mapUrl}
          title={title}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded"
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  );
}