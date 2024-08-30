
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDA1mfXLrK-hbcqmeCDaxvgaRGgUP733E",
  authDomain: "nextjstaskproject.firebaseapp.com",
  projectId: "nextjstaskproject",
  storageBucket: "nextjstaskproject.appspot.com",
  messagingSenderId: "834276182096",
  appId: "1:834276182096:web:741b5133f7dbd731eb2955",
  measurementId: "G-E5T8XR8YNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadToFirebase = async (file: File, oldImageUrl?: string): Promise<string> => {
  // Delete old image if URL is provided
  if (oldImageUrl) {
    try {
      // Extract the file name from the old image URL
      const oldImagePath = oldImageUrl.split('/').pop() || '';
      const oldImageRef = ref(storage, `products/${oldImagePath}`);
      await deleteObject(oldImageRef);
    } catch (error) {
      console.error('Error deleting old image:', error);
    }
  }

  // Upload new image
  const newImageRef = ref(storage, `products/${uuidv4()}`);
  await uploadBytes(newImageRef, file);
  const newImageUrl = await getDownloadURL(newImageRef);
  return newImageUrl;
};
