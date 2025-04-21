"use client";
import { useState } from "react";
import { FileIcon, Upload } from "lucide-react";

export default function ImageUpload() {
  const [imageName, setImageName] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageName(event.target.files[0].name);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full h-40 p-6 border-2 border-dashed rounded-lg ${
        imageName
          ? "border-emerald-500 bg-emerald-50"
          : isHovered
          ? "border-gray-600 bg-gray-50"
          : "border-gray-300 bg-gray-50"
      } transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        id="fileInput"
        onChange={handleChange}
      />

      <label
        htmlFor="fileInput"
        className="flex flex-col justify-center items-center w-full h-full text-center"
      >
        {imageName ? (
          <>
            <FileIcon className="h-10 w-10 text-emerald-500 mb-3" />
            <p className="text-emerald-600 font-medium text-lg mb-1 truncate max-w-full">
              {imageName}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Click to change image
            </p>
          </>
        ) : (
          <>
            <Upload
              className={`w-10 h-10 mb-3 ${
                isHovered ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <p
              className={`font-medium text-lg mb-1 ${
                isHovered ? "text-gray-800" : "text-gray-700"
              }`}
            >
              Click to upload an image
            </p>
            <p className="text-sm text-gray-500">JPG or PNG, max 2MB</p>
          </>
        )}
      </label>
    </div>
  );
}
