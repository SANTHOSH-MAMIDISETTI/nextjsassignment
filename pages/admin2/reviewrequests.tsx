

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert } from '@mui/material';
// import { useAuth } from '../../lib/useauth'; // Adjust path as needed

// const ReviewRequests = () => {
//   const { user, loading } = useAuth(); // Ensure this matches your useAuth return types
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loadingReviewId, setLoadingReviewId] = useState<string | null>(null); // State to track which review is being processed

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!user || !user.token) {
//         setError('User not authenticated');
//         return;
//       }

//       try {
//         const response = await axios.get('/api/reviews/adminrequests', {
//           headers: {
//             Authorization: `Bearer ${user.token}`, // Using user.token correctly
//           },
//         });
//         setReviews(response.data);
//       } catch (error) {
//         console.error('Error fetching review requests:', error);
//         setError('Failed to fetch review requests');
//       }
//     };

//     if (!loading && user) {
//       fetchReviews();
//     }
//   }, [user, loading]);

//   const handleAction = async (review: any, action: 'approve' | 'reject') => {
//     setLoadingReviewId(review._id);

//     try {
//       const response = await axios.put(`/api/reviews/adminrequests/${review._id}`, {
//         status: action === 'approve' ? 'approved' : 'rejected',
//         ...(action === 'approve' ? { name: review.name, description: review.description, price: review.price, imageUrl: review.imageUrl } : {}),
//       }, {
//         headers: {
//           Authorization: `Bearer ${user?.token}`, // Using optional chaining just in case
//         },
//       });

//       const updatedReview = response.data.review;

//       setReviews((prevReviews) =>
//         prevReviews.map((r) =>
//           r._id === review._id ? { ...r, status: updatedReview.status, disabled: true } : r
//         )
//       );
//     } catch (error) {
//       console.error(`Error trying to ${action} review:`, error);
//       setError(`Failed to ${action} review`);
//     } finally {
//       setLoadingReviewId(null);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4">Review Requests</Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Product ID</TableCell>
//               <TableCell>Product Name</TableCell>
//               <TableCell>Product Description</TableCell>
//               <TableCell>Product Price</TableCell>
//               <TableCell>Review Name</TableCell>
//               <TableCell>Review Description</TableCell>
//               <TableCell>Review Price</TableCell>
//               <TableCell>Review Image</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reviews.length > 0 ? (
//               reviews.map((review) => (
//                 <TableRow key={review._id}>
//                   <TableCell>{review.productId || 'N/A'}</TableCell>
//                   <TableCell>{review.productName || 'No name'}</TableCell>
//                   <TableCell>{review.productDescription || 'No description'}</TableCell>
//                   <TableCell>{review.productPrice !== undefined ? `$${review.productPrice.toFixed(2)}` : 'N/A'}</TableCell>
//                   <TableCell>{review.name || 'No name'}</TableCell>
//                   <TableCell>{review.description || 'No description'}</TableCell>
//                   <TableCell>{review.price !== undefined ? `$${review.price.toFixed(2)}` : 'N/A'}</TableCell>
//                   <TableCell>
//                     {review.imageUrl ? (
//                       <img src={review.imageUrl} alt="Review Image" style={{ maxWidth: '100px' }} />
//                     ) : (
//                       'No image'
//                     )}
//                   </TableCell>
//                   <TableCell>{review.status || 'Pending'}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       style={{ marginRight: '0.5rem' }}
//                       onClick={() => handleAction(review, 'approve')}
//                       disabled={review.disabled || loadingReviewId === review._id}
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleAction(review, 'reject')}
//                       disabled={review.disabled || loadingReviewId === review._id}
//                     >
//                       Reject
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">No review requests found</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {error && (
//         <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
//           <Alert onClose={() => setError(null)} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       )}
//     </Container>
//   );
// };

// export default ReviewRequests;





import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../lib/useauth'; // Adjust path as needed

const ReviewRequests = () => {
  const { user, loading } = useAuth(); // Ensure this matches your useAuth return types
  const [reviews, setReviews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingReviewId, setLoadingReviewId] = useState<string | null>(null); // State to track which review is being processed

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user || !user.token) {
        setError('User not authenticated');
        return;
      }

      try {
        const response = await axios.get('/api/reviews/adminrequests', {
          headers: {
            Authorization: `Bearer ${user.token}`, // Using user.token correctly
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching review requests:', error);
        setError('Failed to fetch review requests');
      }
    };

    if (!loading && user) {
      fetchReviews();
    }
  }, [user, loading]);

  const handleAction = async (review: any, action: 'approve' | 'reject') => {
    setLoadingReviewId(review._id);

    try {
      const response = await axios.put(`/api/reviews/adminrequests/${review._id}`, {
        status: action === 'approve' ? 'approved' : 'rejected',
        ...(action === 'approve' ? { name: review.name, description: review.description, price: review.price, imageUrl: review.imageUrl } : {}),
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Using optional chaining just in case
        },
      });

      const updatedReview = response.data.review;

      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r._id === review._id ? { ...r, status: updatedReview.status, disabled: true } : r
        )
      );
    } catch (error) {
      console.error(`Error trying to ${action} review:`, error);
      setError(`Failed to ${action} review`);
    } finally {
      setLoadingReviewId(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Review Requests</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Review Name</TableCell>
              <TableCell>Review Description</TableCell>
              <TableCell>Review Price</TableCell>
              <TableCell>Review Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>{review.productId || 'N/A'}</TableCell>
                  <TableCell>{review.productName || 'No name'}</TableCell>
                  <TableCell>{review.productDescription || 'No description'}</TableCell>
                  <TableCell>{review.productPrice !== undefined ? `$${review.productPrice.toFixed(2)}` : 'N/A'}</TableCell>
                  <TableCell>{review.name || 'No name'}</TableCell>
                  <TableCell>{review.description || 'No description'}</TableCell>
                  <TableCell>{review.price !== undefined ? `$${review.price.toFixed(2)}` : 'N/A'}</TableCell>
                  <TableCell>
                    {review.imageUrl ? (
                      <img src={review.imageUrl} alt="Review Image" style={{ maxWidth: '100px' }} />
                    ) : (
                      'No image'
                    )}
                  </TableCell>
                  <TableCell>{review.status || 'Pending'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '0.5rem' }}
                      onClick={() => handleAction(review, 'approve')}
                      disabled={review.status !== 'pending' || loadingReviewId === review._id}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAction(review, 'reject')}
                      disabled={review.status !== 'pending' || loadingReviewId === review._id}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">No review requests found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ReviewRequests;
