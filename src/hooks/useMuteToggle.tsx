import { useState, useEffect } from "react";

export const useMuteToggle = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const toggleMute = () => {
      const allMediaElements = document.querySelectorAll("audio") as
        | NodeListOf<HTMLAudioElement>
        | [];
      allMediaElements.forEach((element) => {
        element.muted = isMuted;
      });
    };

    toggleMute();

    return () => {
      const allMediaElements = document.querySelectorAll("audio");
      allMediaElements.forEach((element) => {
        element.muted = false;
      });
    };
  }, [isMuted]);

  const handleToggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };

  return { isMuted, handleToggleMute };
};
