// ImageGrid.js
import { useContext, useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
// import { motion } from "framer-motion";
import Skeleton from "./Skeleton";
import { GlobalContext } from "./context/GlobalState";
import { FaHeart } from "react-icons/fa";
import { GlobalUserContext } from "./context/UsersContext";
import LoginModal from "./LoginModal";
import useUpdateFireStore from "../hooks/useUpdateFireStore";

// eslint-disable-next-line react/prop-types
const ImageGrid = ({ setSelectedImg }) => {
  const { docs, isloading } = useFirestore("images");
  const { likesUpdate } = useUpdateFireStore();
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const { toggle, likeHandler, likedImages, setIsOpen } =
    useContext(GlobalContext);
  const { currentUser } = useContext(GlobalUserContext);

  const currentProfileId = currentUser?.id;

  useEffect(() => {
    // Check if docs are loaded and if there are any
    if (!isloading && docs.length > 0) {
      // Create an array of image URLs from the fetched documents
      const imageUrls = docs.map((doc) => doc.url);

      // Preload images
      preloadImages(imageUrls).then(() => {
        // Set state to indicate that images are loaded
        setIsImagesLoaded(true);
      });
    }
  }, [docs, isloading]);

  const preloadImages = async (imageUrls) => {
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    // Wait for all images to be loaded
    await Promise.all(imagePromises);
  };

  return (
    <>
      <LoginModal />
      {toggle && <div className="bg-pink w-20 h-900"></div>}

      {isloading || !isImagesLoaded ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div className="img-grid">
          {docs &&
            docs.map((doc) => (
              <div className="img-wrap relative " key={doc.id}>
                <img
                  onClick={() => {
                    setSelectedImg(doc.url);
                  }}
                  src={doc.url}
                  alt="uploaded pic"
                />
                <div className="bg-gradient-to-b from-transparent to-black  absolute bottom-0 left-0 right-0 transparent text-pink-100 p-2.5 flex items-center justify-between">
                  <FaHeart
                    className={`text-2xl transition-transform cursor-pointer ${
                      currentUser && doc.accountsThatLiked[currentProfileId]
                        ? "text-pink-600"
                        : "text-pink-100"
                    } hover:scale-125 hover:text-pink-600`}
                    style={{ padding: "2px" }}
                    onClick={() => {
                      if (!currentUser) {
                        setIsOpen(true);
                      } else {
                        // logic functionality
                        likesUpdate(doc.id, currentProfileId);
                        // color handling
                      }
                    }}
                  />

                  <div className="text-xs tracking-wider">
                    {doc.likes} Likes
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ImageGrid;
