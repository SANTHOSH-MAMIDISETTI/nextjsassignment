// import multer from 'multer';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Storage } from '@google-cloud/storage'; // Assuming you are using Google Cloud Storage or another cloud provider

// const storage = new Storage();
// const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   upload.single('file')(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error uploading file' });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const file = bucket.file(uuidv4() + path.extname(req.file.originalname));
//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });

//     stream.on('error', (error) => {
//       console.error('Error uploading file:', error);
//       res.status(500).json({ message: 'Error uploading file' });
//     });

//     stream.on('finish', async () => {
//       try {
//         const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${file.name}`;
//         res.status(200).json({ imageUrl: publicUrl });
//       } catch (error) {
//         console.error('Error generating public URL:', error);
//         res.status(500).json({ message: 'Error generating public URL' });
//       }
//     });

//     stream.end(req.file.buffer);
//   });
// };

// export default uploadHandler;
