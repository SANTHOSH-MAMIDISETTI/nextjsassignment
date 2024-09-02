

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { Container, Typography, Card, CardContent, CardMedia, Grid, CircularProgress, Button, Snackbar, Alert } from '@mui/material';
// import { useAuth } from '../../lib/useauth';
// // import { useAuth } from '../lib/useauth'; // Adjust the import path as needed

// const ProductsPage = () => {
//   const router = useRouter();
//   const { user, loading } = useAuth();
//   const [products, setProducts] = useState<any[]>([]);
//   const [fetching, setFetching] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   useEffect(() => {
//     if (loading) return; // Don't fetch products while loading user

//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('/api/products', {
//           headers: {
//             Authorization: `Bearer ${user?.token}`, // Use the token from the user state
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         setError('Error fetching products');
//         console.error('Error fetching products:', error);
//       } finally {
//         setFetching(false);
//       }
//     };

//     if (user) {
//       fetchProducts();
//     } else {
//       router.push('/login'); // Redirect to login if user is not authenticated
//     }
//   }, [user, loading, router]);

//   const handleEditClick = (id: string) => {
//     router.push(`/admin/${id}`);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await axios.delete(`/api/products/${id}`, {
//         headers: {
//           Authorization: `Bearer ${user?.token}`, // Use the token from the user state
//         },
//       });
//       if (response.status === 200) {
//         setSuccess('Product deleted successfully');
//         setProducts(products.filter(product => product._id !== id)); // Update the product list
//       } else {
//         throw new Error('Failed to delete product');
//       }
//     } catch (error) {
//       setError('Error deleting product');
//       console.error('Error deleting product:', error);
//     }
//   };

//   if (loading || fetching) return <CircularProgress />;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Product List
//       </Typography>
//       {error && (
//         <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
//           <Alert onClose={() => setError(null)} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       )}
//       {success && (
//         <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
//           <Alert onClose={() => setSuccess(null)} severity="success">
//             {success}
//           </Alert>
//         </Snackbar>
//       )}
//       {products.length === 0 ? (
//         <Typography>No products found</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {products.map((product) => (
//             <Grid item xs={12} sm={6} md={4} key={product._id}>
//               <Card>
//                 {product.imageUrl && (
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={product.imageUrl}
//                     alt={product.name}
//                   />
//                 )}
//                 <CardContent>
//                   <Typography variant="h6">{product.name}</Typography>
//                   <Typography variant="body1">Price: ${product.price}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {product.description}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleEditClick(product._id)}
//                     sx={{ marginTop: '1rem' }}
//                   >
//                     Edit Product
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleDelete(product._id)}
//                     style={{ marginTop: '16px', marginLeft: '16px' }}
//                   >
//                     Delete
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default ProductsPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, CardMedia, Grid, CircularProgress, Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, Pagination } from '@mui/material';
import { useAuth } from '../../lib/useauth';

const ProductsPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(6); // Adjust this value as needed

  useEffect(() => {
    if (loading) return; // Don't fetch products while loading user

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Use the token from the user state
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchProducts();
    } else {
      router.push('/login'); // Redirect to login if user is not authenticated
    }
  }, [user, loading, router]);

  const handleEditClick = (id: string) => {
    router.push(`/admin/${id}`);
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     const response = await axios.delete(`/api/products/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`, // Use the token from the user state
  //       },
  //     });
  //     if (response.status === 200) {
  //       setSuccess('Product deleted successfully');
  //       setProducts(products.filter(product => product._id !== id)); // Update the product list
  //     } else {
  //       throw new Error('Failed to delete product');
  //     }
  //   } catch (error) {
  //     setError('Error deleting product');
  //     console.error('Error deleting product:', error);
  //   }
  // };

  const handleDelete = async (id: string) => {
        try {
          const response = await axios.delete(`/api/products/${id}`, {
            headers: {
              Authorization: `Bearer ${user?.token}`, // Use the token from the user state
            },
          });
          if (response.status === 200) {
            setSuccess('Product deleted successfully');
            setProducts(products.filter(product => product._id !== id)); // Update the product list
          } else {
            throw new Error('Failed to delete product');
          }
        } catch (error) {
          setError('Error deleting product');
          console.error('Error deleting product:', error);
        }
      };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage;
      link.download = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM by removing the link element after clicking
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading || fetching) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
          <Alert onClose={() => setSuccess(null)} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
      {currentProducts.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  sx={{
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    },
                  }}
                >
                  {product.imageUrl && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.imageUrl}
                      alt={product.name}
                      onClick={() => handleImageClick(product.imageUrl)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1">Price: ${product.price}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                   
                      onClick={() => handleEditClick(product._id)}
                      sx={{ marginTop: '1rem' ,textTransform:"capitalize", mt: 2,
                        ':hover': {
                          backgroundColor: 'green',
                          transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.3s ease-in-out',}}
                    >
                      Edit Product
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(product._id)}
                      sx={{ marginTop: '16px', marginLeft: '30%',textTransform:"capitalize",bg:"red" , mt: 2,
                        ':hover': {
                          backgroundColor: 'red',
                          transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.3s ease-in-out',}}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(products.length / productsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
          />
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          <DialogContentText>Do you want to download this image?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload} color="primary">
            Download Image
          </Button>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductsPage;

