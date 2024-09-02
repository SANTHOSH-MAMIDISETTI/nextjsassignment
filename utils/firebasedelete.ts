// // pages/api/delete-from-firebase.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { bucket } from './firebaseadmin';// Adjust path as needed

// export default async function deletehandler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'DELETE') {
//     try {
//       // Parse image URL from request body
//       const { imageUrl } = req.body;

//       if (!imageUrl) {
//         return res.status(400).json({ error: 'Image URL is required' });
//       }

//       // Decode the URL and extract the file path
//       const decodedUrl = decodeURIComponent(imageUrl.split('/').pop() || '');
//       const filePath = decodedUrl.substring(decodedUrl.indexOf('o/') + 2).split('?')[0];

//       // Get a reference to the file in the bucket and delete it
//       const file = bucket.file(filePath);
//       await file.delete();

//       return res.status(200).json({ message: 'Image deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting image:', error);
//       return res.status(500).json({ error: 'Failed to delete image' });
//     }
//   }

//   return res.status(405).end(); // Method Not Allowed
// }
import { getStorage, ref, deleteObject } from 'firebase/storage';

export const deletehandler = async (imageUrl: string): Promise<void> => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};
