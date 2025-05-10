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
        <div
          style={{
            background:
              "linear-gradient(45deg, #FBD85A 0%, #E97D98 50%, #FA64CE 100%)",
          }}
          className=" w-full h-full "
        >
          <p className="opacity-0">placeholder</p>
        </div>
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
