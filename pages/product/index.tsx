import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, CardMedia, Grid, CircularProgress, Button, Snackbar, Alert } from '@mui/material';

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  if (loading) return <CircularProgress />;

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
      {products.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
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
                    onClick={() => handleEditClick(product._id)}
                    sx={{ marginTop: '1rem' }}
                  >
                    Edit Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductsPage;
