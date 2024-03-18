import { projectFirestore } from "../firebase/config.js";
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  deleteField,
} from "firebase/firestore";

const useUpdateFireStore = () => {
  const updateComment = async (
    imageId,
    profileId,
    profileName,
    commentInput
  ) => {
    const imageRef = doc(projectFirestore, "images", imageId);
    const imageSnapshot = await getDoc(imageRef);
    const imageData = imageSnapshot.data();

    const newCommentUpdate = {
      ...imageData.comments,
      [profileId]: { [profileName]: commentInput },
    };

    await updateDoc(imageRef, { comments: newCommentUpdate });
  };

  const likesUpdate = async (imageId, profileId) => {
    const imageRef = doc(projectFirestore, "images", imageId);

    const imageSnapshot = await getDoc(imageRef);
    const imageData = imageSnapshot.data();

    // Check if the profile has already liked the image
    if (imageData.accountsThatLiked[profileId]) {
      await updateDoc(imageRef, {
        likes: increment(-1),
      });
      await updateDoc(imageRef, {
        [`accountsThatLiked.${profileId}`]: deleteField(),
      });
    } else {
      await updateDoc(imageRef, {
        likes: increment(1),
      });
      const newAccountsLikedThat = {
        ...imageData.accountsThatLiked,
        [profileId]: true,
      };
      await updateDoc(imageRef, { accountsThatLiked: newAccountsLikedThat });
    }
  };

  return { likesUpdate, updateComment };
};

export default useUpdateFireStore;
