"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function ImageInput() {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="relative w-[300px] h-[200px] border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg bg-gray-50 transition-colors">
      <label className="w-full h-full absolute inset-0 cursor-pointer flex flex-col items-center justify-center p-6">
        <Upload className="h-10 w-10 text-gray-400 mb-3" strokeWidth={1.5} />

        {image ? (
          <p>{image.name}</p>
        ) : (
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium text-gray-700">
              Upload or drag & drop an image
            </p>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Max file size: 2MB</p>
              <p className="text-xs text-gray-500">
                Recommended aspect ratio: 2:1 (300×200)
              </p>
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          name="image_url[]"
          onChange={(e) => {
            setImage(e.target.files?.[0] || null);
          }}
        />
      </label>
    </div>
  );
}
