"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Cameras() {
  const [displayMode, setDisplayMode] = useState<"single" | "grid">("single");
  const [selectedCamera, setSelectedCamera] = useState(0);

  // Sample camera data with placeholder images
  const cameras = [
    {
      id: 1,
      name: "Front Door",
      image: "https://picsum.photos/1920/1080",
    },
    {
      id: 2,
      name: "Back Yard",
      image: "https://picsum.photos/1920/1080",
    },
    {
      id: 3,
      name: "Kitchen",
      image: "https://picsum.photos/1920/1080",
    },
    {
      id: 4,
      name: "Living Room",
      image: "https://picsum.photos/1920/1080",
    },
    {
      id: 5,
      name: "Garage",
      image: "https://picsum.photos/1920/1080",
    },
  ];

  const nextCamera = () => {
    setSelectedCamera((prev) => (prev + 1) % cameras.length);
  };

  const prevCamera = () => {
    setSelectedCamera((prev) => (prev - 1 + cameras.length) % cameras.length);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button
            variant={displayMode === "single" ? "default" : "ghost"}
            onClick={() => setDisplayMode("single")}
          >
            Single View
          </Button>
          <Button
            variant={displayMode === "grid" ? "default" : "ghost"}
            onClick={() => setDisplayMode("grid")}
          >
            Grid View
          </Button>
        </div>
        {displayMode === "single" && (
          <div className="flex space-x-2">
            <Button onClick={prevCamera}>
              <ArrowLeft className="w-2 h-2" />
            </Button>
            <Button onClick={nextCamera}>
              <ArrowRight className="w-2 h-2" />
            </Button>
          </div>
        )}
      </div>

      {displayMode === "single" ? (
        <div className="mb-6">
          <div className="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={cameras[selectedCamera].image}
              alt={cameras[selectedCamera].name}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
              {cameras[selectedCamera].name}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cameras.map((camera) => (
            <div
              key={camera.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
              onClick={() => {
                setSelectedCamera(cameras.findIndex((c) => c.id === camera.id));
                setDisplayMode("single");
              }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={camera.image}
                  alt={camera.name}
                  width={1920}
                  height={1080}
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {camera.name}
                </div>
              </div>
              <div className="p-3">
                <h2 className="font-semibold">{camera.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
