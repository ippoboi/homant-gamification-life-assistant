"use client";

import { useState, useEffect } from "react";
import { useSpring } from "@react-spring/web";

export default function Voice() {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("Tap to speak");

  // Blob animation with react-spring
  const blobProps = useSpring({
    scale: listening ? 1.2 : 1,
    opacity: 1,
    config: {
      mass: 1,
      tension: 180,
      friction: 12,
    },
  });

  // Ripple animations
  const ripple1Props = useSpring({
    scale: listening ? 1.5 : 1,
    opacity: listening ? 0 : 0.5,
    config: { duration: 1500 },
    loop: listening,
  });

  const ripple2Props = useSpring({
    scale: listening ? 1.8 : 1,
    opacity: listening ? 0 : 0.3,
    config: { duration: 2000 },
    loop: listening,
    delay: 400,
  });

  // Audio waveform animation for when voice is active
  const [waveforms, setWaveforms] = useState(Array(12).fill(20));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (listening) {
      interval = setInterval(() => {
        setWaveforms(
          Array(12)
            .fill(0)
            .map(() => Math.floor(Math.random() * 40) + 10)
        );
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [listening]);

  const toggleListening = () => {
    console.log("Toggle clicked, current state:", listening);
    setListening((prev) => !prev);
    setMessage(listening ? "Tap to speak" : "Listening...");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Voice Assistant</h1>
        <p className="text-zinc-400">Ask me anything or give me a command</p>
      </div>

      {/* Blob container */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        {/* Ripple effects */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            transform: `scale(${ripple1Props.scale.get()})`,
            opacity: ripple1Props.opacity.get(),
            transition: "transform 0.3s, opacity 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.03)",
            transform: `scale(${ripple2Props.scale.get()})`,
            opacity: ripple2Props.opacity.get(),
            transition: "transform 0.3s, opacity 0.3s",
          }}
        />

        {/* Main blob */}
        <div
          onClick={toggleListening}
          className="focus:outline-none shadow-lg shadow-indigo-500/30 flex items-center justify-center"
          style={{
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            cursor: "pointer",
            border: "none",
            transform: `scale(${blobProps.scale.get()})`,
            opacity: blobProps.opacity.get(),
            transition: "transform 0.3s, opacity 0.3s",
          }}
        >
          {listening ? (
            // Microphone waveform
            <div className="flex items-center justify-center space-x-1 h-8">
              {waveforms.map((height, index) => (
                <div
                  key={index}
                  className="w-1 bg-white rounded-full"
                  style={{
                    height: `${height}px`,
                    transition: "height 0.1s ease",
                  }}
                ></div>
              ))}
            </div>
          ) : (
            // Microphone icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          )}
        </div>
      </div>

      {/* Message display */}
      <div className="max-w-md w-full mx-auto text-center">
        <p className="text-xl text-white mb-6">{message}</p>

        {/* Suggestions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="p-3 bg-zinc-800 rounded-lg text-left text-zinc-300 hover:bg-zinc-700 transition">
            <p className="text-sm">Try saying:</p>
            <p className="text-white">
              &quot;What&apos;s the weather like today?&quot;
            </p>
          </button>
          <button className="p-3 bg-zinc-800 rounded-lg text-left text-zinc-300 hover:bg-zinc-700 transition">
            <p className="text-sm">Try saying:</p>
            <p className="text-white">&quot;Set a timer for 5 minutes&quot;</p>
          </button>
          <button className="p-3 bg-zinc-800 rounded-lg text-left text-zinc-300 hover:bg-zinc-700 transition">
            <p className="text-sm">Try saying:</p>
            <p className="text-white">&quot;Turn on kitchen lights&quot;</p>
          </button>
          <button className="p-3 bg-zinc-800 rounded-lg text-left text-zinc-300 hover:bg-zinc-700 transition">
            <p className="text-sm">Try saying:</p>
            <p className="text-white">&quot;Play my favorite playlist&quot;</p>
          </button>
        </div>
      </div>
    </div>
  );
}
