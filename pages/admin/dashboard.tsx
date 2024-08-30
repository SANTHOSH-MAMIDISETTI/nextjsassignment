
// "use client";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// // import { Button } from 'react-bootstrap';
// import { Container,CardActions, Typography, TextField, Grid, Snackbar, Alert, Card, CardContent, Button,CardMedia, InputAdornment,} from '@mui/material';
// import { useAuth } from '../../lib/useauth'; // Import useAuth correctly
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { uploadToFirebase } from '../../utils/firebase';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import { styled } from '@mui/material/styles'; // Ensure this function is defined
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 0.5,
// });


// const AdminDashboard = () => {
//   const router = useRouter();
//   const { user, loading } = useAuth();
//   const [productName, setProductName] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [productImage, setProductImage] = useState<File | null>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [fetchingProducts, setFetchingProducts] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//    const [show, setShow] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (!user || !user.token) {
//         router.push('/login'); // Redirect if user is not authenticated or token is missing
//         return;
//       }

//       try {
//         const response = await axios.get('/api/products', {
//           headers: {
//             Authorization: `Bearer ${user.token}`, // Include the token
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         setError('Failed to fetch products');
//         console.error('Failed to fetch products:', error);
//       } finally {
//         setFetchingProducts(false);
//       }
//     };

//     const verifyUser = async () => {
//       if (!loading) {
//         if (user && user.token) {
//           await fetchProducts();
//         } else {
//           router.push('/login'); // Redirect to login if no token
//         }
//       }
//     };

//     verifyUser();
//   }, [user, loading, router]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setProductImage(file);
//   };
//   const handleViewRequests = () => {
//     router.push('/admin2/reviewrequests'); // Adjust path if necessary
//   };
//   const navigateToProfile = () => {
//     router.push('/profile1'); // Navigate to the profile page
//   };
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleProductSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!productImage) {
//       setError('Please upload an image');
//       return;
//     }

//     if (!user || !user.token) {
//       setError('User not authenticated');
//       return;
//     }

//     try {
//       // Upload image to Firebase
//       const imageUrl = await uploadToFirebase(productImage);

//       // Post product details to the server
//       const response = await axios.post('/api/products', {
//         name: productName,
//         price: parseFloat(productPrice),
//         description: productDescription,
//         imageUrl,
//       }, {
//         headers: {
//           Authorization: `Bearer ${user.token}`, // Include token in headers
//         },
//       });

//       if (response.status === 201) {
//         setSuccess('Product created successfully!');
//         setProductName('');
//         setProductPrice('');
//         setProductDescription('');
//         setProductImage(null); // Clear image after successful submission

//         // Fetch the updated products list
//         const updatedProducts = await axios.get('/api/products', {
//           headers: {
//             Authorization: `Bearer ${user.token}`, // Include token in headers
//           },
//         });
//         setProducts(updatedProducts.data);
//       } else {
//         throw new Error('Failed to create product');
//       }
//     } catch (error) {
//       setError('Failed to create product. Please try again.');
//       console.error('Product creation error:', error);
//     }
//   };

//   return (



// <Container style={{ width: "40%" }} sx={{ mt: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>

//       <Card sx={{ mb: 6 }}>
//         <CardContent>
//           <Typography style={{ textAlign: "center" }} variant="h5" gutterBottom>
//             Create New Product
//           </Typography>

//           <form onSubmit={handleProductSubmit}>
//             <TextField
//               fullWidth
//               label="Product Name"
//               variant="outlined"
//               margin="normal"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Product Price"
//               variant="outlined"
//               margin="normal"
//               type="number"
//               value={productPrice}
//               onChange={(e) => setProductPrice(e.target.value)}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start">$</InputAdornment>,
//               }}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Product Description"
//               variant="outlined"
//               margin="normal"
//               multiline
//               rows={3}
//               value={productDescription}
//               onChange={(e) => setProductDescription(e.target.value)}
//               required
//             />
//             <CardActions>
//               <Grid container spacing={25}>
//                 <Grid item xs={6}>
//                   <Button
//                     component="label"
//                     variant="contained"
//                     startIcon={<CloudUploadIcon />}
//                     sx={{ textTransform: 'capitalize', }}
//                   >
//                     Upload files
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       multiple
//                       hidden
//                     />
//                   </Button>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="success"
//                     sx={{ textTransform: 'capitalize', }}
//                     onClick={handleProductSubmit}
//                   >
//                     Create Product
//                   </Button>
//                 </Grid>
//               </Grid>
//             </CardActions>
//           </form>
//         </CardContent>
//       </Card>

      
//       <div style={{display:"flex",gap:"30px",paddingBottom:"10%"}}>
//         <Button
//             variant="contained"
//             color="secondary"
//             href="/admin/products"
//             sx={{ textTransform: 'capitalize',mt: 2 }}
//           >
//             Get the Products
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ textTransform: 'capitalize',mt: 2 }}
//             onClick={handleViewRequests}
//           >
//             View Product Review Requests
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ textTransform: 'capitalize' , mt: 2 }}
//             onClick={navigateToProfile}
//           >
//             View Profile
//           </Button>
//       </div>

//       {error && (
//   <Snackbar
//     open={!!error}
//     autoHideDuration={6000}
//     onClose={() => setError(null)}
//     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Positioning the Snackbar at the top center
//   >
//     <Alert onClose={() => setError(null)} severity="error">
//       {error}
//     </Alert>
//   </Snackbar>
// )}

// {success && (
//   <Snackbar
//     open={!!success}
//     autoHideDuration={6000}
//     onClose={() => setSuccess(null)}
//     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Positioning the Snackbar at the top center
//   >
//     <Alert onClose={() => setSuccess(null)} severity="success">
//       {success}
//     </Alert>
//   </Snackbar>
// )}
//     </Container>


//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Container, CardActions, Typography, TextField, Grid, Snackbar, Alert, Card, CardContent, Button, InputAdornment } from '@mui/material';
import { useAuth } from '../../lib/useauth';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadToFirebase } from '../../utils/firebase';

const AdminDashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || !user.token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Failed to fetch products:', error);
      } finally {
        setFetchingProducts(false);
      }
    };

    const verifyUser = async () => {
      if (!loading) {
        if (user && user.token) {
          await fetchProducts();
        } else {
          router.push('/login');
        }
      }
    };

    verifyUser();
  }, [user, loading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProductImage(file);
  };

  const handleViewRequests = () => {
    router.push('/admin2/reviewrequests');
  };

  const navigateToProfile = () => {
    router.push('/profile1');
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productImage) {
      setError('Please upload an image');
      return;
    }

    if (!user || !user.token) {
      setError('User not authenticated');
      return;
    }

    try {
      const imageUrl = await uploadToFirebase(productImage);

      const response = await axios.post('/api/products', {
        name: productName,
        price: parseFloat(productPrice),
        description: productDescription,
        imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 201) {
        setSuccess('Product created successfully!');
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);

        const updatedProducts = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProducts(updatedProducts.data);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      setError('Failed to create product. Please try again.');
      console.error('Product creation error:', error);
    }
  };

  return (
    <Container style={{ width: "40%" }} sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Card 
        sx={{ 
          mb: 6,
          ':hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            transform: 'scale(1.02)',
          },
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <CardContent>
          <Typography style={{ textAlign: "center" }} variant="h5" gutterBottom>
            Create New Product
          </Typography>

          <form onSubmit={handleProductSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              margin="normal"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Product Price"
              variant="outlined"
              margin="normal"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              required
            />
            <TextField
              fullWidth
              label="Product Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
            <CardActions>
              <Grid container spacing={25}>
                <Grid item xs={6}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      textTransform: 'capitalize',
                      ':hover': {
                        backgroundColor: 'orange',
                        transform: 'scale(1.05)',
                      },
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  >
                    Upload files
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{
                      textTransform: 'capitalize',
                      ':hover': {
                        backgroundColor: 'black',
                        transform: 'scale(1.05)',
                      },
                      transition: 'transform 0.3s ease-in-out',
                    }}
                    onClick={handleProductSubmit}
                  >
                    Create Product
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </form>
        </CardContent>
      </Card>

      <div style={{ display: "flex", gap: "30px", paddingBottom: "10%" }}>
        <Button
          variant="contained"
          color="secondary"
          href="/admin/products"
          sx={{
            textTransform: 'capitalize',
            mt: 2,
            ':hover': {
              backgroundColor: 'red',
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          Get the Products
        </Button>
        {/* <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'capitalize',
            mt: 2,
            ':hover': {
              backgroundColor: 'yellow',
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.3s ease-in-out',
          }}
          onClick={handleViewRequests}
        >
          View Product Review Requests
        </Button> */}
        <Button
          variant="contained"
          color="success"
          sx={{
            textTransform: 'capitalize',
            mt: 2,
            ':hover': {
              backgroundColor: 'black',
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.3s ease-in-out',
          }}
          onClick={navigateToProfile}
        >
          View Profile
        </Button>
      </div>

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={() => setSuccess(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccess(null)} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default AdminDashboard;
