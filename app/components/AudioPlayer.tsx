"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AudioPlayerProps {
  audioSource?: string;
  defaultMuted?: boolean;
}

export default function AudioPlayer({
  audioSource = "/background-music.mp3",
  defaultMuted = false,
}: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(defaultMuted);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
        console.log("Autoplay was blocked. User needs to interact first.");
      });
    }
  }, [isMuted]);

  const toggleMute = async () => {
  if (!audioRef.current) return;

  if (isMuted) {
    try {
      await audioRef.current.play();
      setIsMuted(false);
    } catch (err) {
      console.log(err);
    }
  } else {
    audioRef.current.pause();
    setIsMuted(true);
  }
};

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSource}
        loop
       preload="auto"
      />

      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-40 bg-[#5C4033]/80 hover:bg-[#5C4033] text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        title={isMuted ? "Click to unmute" : "Click to mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  );
}
