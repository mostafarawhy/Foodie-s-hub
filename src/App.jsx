import { useState, useEffect } from "react";
import ImageGrid from "./components/ImageGrid";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import Modal from "./components/Modal";
import Home from "./components/Home";
import GlobalProvider from "./components/context/GlobalState";
import GlobalUserProvider from "./components/context/UsersContext";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  // Function to clear the selectedImg state
  const clearSelectedImg = () => {
    setSelectedImg(null);
  };

  // Add an effect with cleanup for component unmounting
  useEffect(() => {
    // Cleanup function to clear the selectedImg state on unmount
    return () => {
      clearSelectedImg();
    };
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <GlobalUserProvider>
      <GlobalProvider>
        <Home />
        <div className={"App  "}>
          <Title />
          <UploadForm />
          <ImageGrid setSelectedImg={setSelectedImg} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </div>
      </GlobalProvider>
    </GlobalUserProvider>
  );
}

export default App;
