import React, { useEffect, useState } from 'react';

const backgrounds = [
  "AP1GczNXeBKelJbNLjcu77tlBUgAejFpNOcVzWv4GcK_ze-gK9-W0SimL5pW06q9LO0lVgBzMxufPr_XtSmyNnLjV07ioVNhxnDA_D0fLAKmMowuSiYKlTSE8SWF2q4Q3k6MHGAfIZf70yt0k8DLW4zOkw3MRA=w1366-h600-s-no-gm",
  "AP1GczO8Gpo9Q-DxPxLRx3atB1WSdGPU3F_tB3JJZvxdXVvSNe7kPOlGjhL3s6W_GsqsZNmzGtPMMpy4CvZ0ZchgnvqqlWTcNFoooxvOOzlcjezYbUDiYkFEL6Bb8n6gc0R8r3UwRSlsScI3fQYP19geMtnCcw=w1366-h600-s-no-gm",
];

const BackgroundChanger = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [fade, setFade] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = backgrounds.map((bg) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = `https://lh3.googleusercontent.com/pw/${bg}`;
          img.onload = () => resolve();
        });
      });

      await Promise.all(promises);
      setIsLoaded(true); // Set the loaded state to true after all images are loaded
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // Do not start interval until images are loaded

    const intervalId = setInterval(() => {
      setFade(false); // Start fade-out effect
      setTimeout(() => {
        setCurrentBackground((prevBackground) => (prevBackground + 1) % backgrounds.length);
        setFade(true); // Start fade-in effect after background change
      }, 1000); // Wait for the fade-out duration before changing the image
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [isLoaded]);

  return (
    <>
      <style>{`
        .background {
          position: fixed; /* This ensures the background covers the entire viewport */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          z-index: -1; /* Place it behind other content */
          transition: opacity 1s ease-in-out;
        }

        .fade-in {
          opacity: 1; /* Fully visible */
        }

        .fade-out {
          opacity: 0; /* Fully transparent */
        }
      `}</style>
      {isLoaded && (
        <div
          className={`background object-fill ${fade ? 'fade-in' : 'fade-out'}`}
          style={{
            backgroundImage: `url(https://lh3.googleusercontent.com/pw/${backgrounds[currentBackground]})`,
            filter: 'blur(2px)', // Adding blur effect
          }}
        ></div>
      )}
    </>
  );
};

export default BackgroundChanger;
