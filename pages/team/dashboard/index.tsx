

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, CardMedia, Typography, Grid, Card, CardContent, Button, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../../lib/useauth'; // Adjust path as needed
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Adjust the number as needed
  const router = useRouter();
  const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || !user.token) {
        setError('User not authenticated');
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
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      }
    };

    if (!loading) {
      fetchProducts();
    }
  }, [user, loading]);

  const handleEditClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleRequestClick = () => {
    router.push('/profile/userlistrequest');
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
    <Typography variant="h4">Product Dashboard</Typography>
    {error && (
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    )}
    {currentProducts.length === 0 ? (
      <Typography>No products found</Typography>
    ) : (
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              {product.imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
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
                  style={{textTransform:"capitalize"}}
                  onClick={() => handleEditClick(product._id)}
                  sx={{ marginTop: '1rem' }}
                >
                  Edit Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRequestClick}
            sx={{ marginTop: '1rem' }}
          >
            My Requests
          </Button>
        </Grid>
      </Grid>
    )}
    <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          style={{textTransform:"capitalize"}}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          style={{textTransform:"capitalize"}}
          color="primary"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  </Container>
  );
};

export default Dashboard;
