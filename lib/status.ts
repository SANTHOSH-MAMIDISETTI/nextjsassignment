// import type { NextApiRequest, NextApiResponse } from 'next';
// // import authenticateToken from '../../middlewares/authenticateToken';
// import authenticateToken from './me';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'GET') {
//     // Apply middleware
//     authenticateToken(req, res, async () => {
//       // After token is verified
//       res.status(200).json({ user: (req as any).user });
//     });
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default handler;
