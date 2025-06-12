import React from "react";

interface YouTubeCardProps {
  title: string;
}

export default function YouTubeCard({ title }: YouTubeCardProps) {
  return (
    <div className="bg-black rounded-lg shadow-md p-4 w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
      <div className="w-full aspect-video">
        <iframe
          src="https://www.youtube.com/embed/frlUveXhn1w?si=MH-FqNHRQOcrldYj"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full rounded"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}