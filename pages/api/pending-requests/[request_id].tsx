// import { GetServerSideProps } from 'next';
// import Review from '../../models/Review';

// const ReviewPage = ({ review }: any) => {
//   return (
//     <div>
//       {/* Admin can see details of a pending request */}
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { request_id } = context.query;
//   const review = await Review.findById(request_id);
//   return { props: { review } };
// };

// export default ReviewPage;
