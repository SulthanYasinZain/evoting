"use client";

import type React from "react";

import { useState, useEffect } from "react";

export default function CandidateNumberSelection({
  candidate_number,
}: {
  candidate_number?: string;
}) {
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

  useEffect(() => {
    if (candidate_number) {
      setSelectedNumber(candidate_number);
    }
  }, [candidate_number]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNumber(event.target.value);
  };

  return (
    <div className="grid grid-cols-3 w-full gap-2">
      {[1, 2, 3].map((number) => {
        const isSelected = selectedNumber === number.toString();
        return (
          <label key={number} className="relative cursor-pointer w-full">
            <input
              type="radio"
              name="number"
              value={number}
              className="sr-only"
              onChange={handleChange}
              checked={isSelected}
            />
            <div
              className={`
                flex items-center justify-center
                w-full h-10 rounded-md
                border-2 font-medium text-lg
                transition-all duration-200
                ${
                  isSelected
                    ? "border-red-500 text-white bg-red-500"
                    : "border-gray-300 text-gray-700 hover:border-gray-500"
                }
              `}
            >
              {number}
            </div>
          </label>
        );
      })}
    </div>
  );
}
