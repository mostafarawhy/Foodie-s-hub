import { useState, createContext, useEffect } from "react";

// Create context with initial state and functions
export const GlobalContext = createContext({
  isOpen: true, // Initial value for isOpen state
  setIsOpen: () => {}, // Placeholder function for setIsOpen
  toggle: true, //mobilemenu toggle
  setToggle: () => {},
  likedImages: null,
  setLikedImages: () => {},
});

// GlobalProvider component
// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Initial state should be false
  const [toggle, setToggle] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [likedImages, setLikedImages] = useState(() => {
    const storedLikedImages = localStorage.getItem("likedImages");
    return storedLikedImages ? JSON.parse(storedLikedImages) : {};
  });

  const handleMouseEnter = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (starIndex) => {
    setRating(starIndex);
  };

  useEffect(() => {
    // Save likedImages to local storage whenever it changes
    localStorage.setItem("likedImages", JSON.stringify(likedImages));
  }, [likedImages]);

  const likeHandler = (imageId) => {
    const newLikedImages = { ...likedImages };

    // Toggle the liked status of the imageId
    if (newLikedImages[imageId]) {
      delete newLikedImages[imageId]; // If liked, remove from likedImages
    } else {
      newLikedImages[imageId] = true; // If not liked, add to likedImages
    }

    // Update the state with the modified likedImages object
    setLikedImages(newLikedImages);
  };

  const GlobalProviderValue = {
    isOpen,
    setIsOpen,
    toggle,
    setToggle,
    likedImages,
    setLikedImages,

    likeHandler,
  };

  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
