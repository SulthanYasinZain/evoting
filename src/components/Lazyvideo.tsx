import Image from "next/image";
import { useState } from "react";

export default function LazyVideo({ src }: { src?: string }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <>
      {!isVideoLoaded && (
        <Image
          src="/video-placeholder.jpg"
          alt="Lazy loaded video thumbnail"
          fill
        />
      )}

      <video
        className={`w-full h-auto ${!isVideoLoaded ? "hidden" : ""}`}
        onLoadedData={handleVideoLoaded}
        loop
        playsInline
        autoPlay
        muted
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
