import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500); // Adjust the interval speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mt-4">
      <ProgressBar animated now={progress} label={`${progress}%`} />
    </div>
  );
};

export default LoadingBar;
