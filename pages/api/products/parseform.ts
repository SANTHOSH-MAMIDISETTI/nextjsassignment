// import formidable, { IncomingForm } from 'formidable';
// import path from 'path';
// import fs from 'fs';

// const tmpDir = path.join(process.cwd(), 'tmp');
// if (!fs.existsSync(tmpDir)) {
//   fs.mkdirSync(tmpDir);
// }

// export const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   return new Promise((resolve, reject) => {
//     const form = new IncomingForm();
//     form.uploadDir = tmpDir; // Directory for temporary file storage
//     form.keepExtensions = true;

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ fields, files });
//       }
//     });
//   });
// };
