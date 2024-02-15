import { useEffect, useState } from 'react';

const useExecuteAfterTimeout = (callback: ()=> void, timeForAnswerInSeconds:number) => {
  const [timeLeft, setTimeLeft] = useState(timeForAnswerInSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    if (timeLeft === 0) {
      callback();
    }

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0 && timeLeft < timeForAnswerInSeconds) {
      if (interval !== null) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timeForAnswerInSeconds);
  };

  return {
    timeLeft, startTimer, resetTimer, pauseTimer,
  };
};

export default useExecuteAfterTimeout;
