import { motion } from "framer-motion";
import CommentBox from "./CommentBox";
import { useContext, useEffect, useState } from "react";
import useUpdateFireStore from "../hooks/useUpdateFireStore";
import useFirestore from "../hooks/useFirestore";
import { GlobalUserContext } from "./context/UsersContext";

// eslint-disable-next-line react/prop-types
const Modal = ({ setSelectedImg, selectedImg }) => {
  const [input, setInput] = useState("");
  const { docs } = useFirestore("images");
  const { updateComment } = useUpdateFireStore();
  const { currentUser } = useContext(GlobalUserContext);
  const currentProfileId = currentUser?.id;
  const currentProfileName = currentUser?.name;

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className="backdrop flex flex-col justify-center items-center"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
      <div className="mt-5 w-full flex flex-row justify-center items-center">
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Add Your Experience..."
          className=" border w-8/12 border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
        />
        <button
          onClick={() => updateComment(input)}
          className="ml-2 bg-pink-700 hover:bg-pink-800 text-white font-bold rounded-r-md px-4 py-2"
        >
          Comment
        </button>
      </div>
      <CommentBox />
    </motion.div>
  );
};

export default Modal;
