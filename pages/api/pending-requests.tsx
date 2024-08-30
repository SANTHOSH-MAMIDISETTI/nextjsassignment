import { GetServerSideProps } from 'next';
// import { authMiddleware } from '../lib/middleware';
import { authMiddleware } from '../../lib/middleware';

const PendingRequests = ({ reviews }: any) => {
  return (
    <div>
      {/* Admin can see and manage pending requests */}
    </div>
  );
};

export const getServerSideProps = authMiddleware(async (req: any, res: any) => {
  // Fetch pending reviews
  return { props: { reviews: [] } };
});

export default PendingRequests;
