import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Snackbar, Alert, CardMedia, Card, CardContent } from '@mui/material';
import { useAuth } from '../../lib/useauth'; // Adjust path as needed
import { uploadToFirebase } from '../../utils/firebase'; // Adjust path as needed
import Cropper from 'react-easy-crop'; // Add a cropper library for image editing
import getCroppedImg from '../../utils/cropimage';
// import getCroppedImg from '../../utils/cropImage'; // Utility function to get cropped image

const ProductDetail = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { product_id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>('');
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropping, setCropping] = useState(false); // State to handle image cropping
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!user || !user.token) {
        setError('User not authenticated');
        return;
      }

      try {
        const response = await axios.get(`/api/products/${product_id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const productData = response.data;
        setProduct(productData);
        setTitle(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setImagePreview(productData.imageUrl);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details');
      }
    };

    if (product_id && !loading) {
      fetchProduct();
    }
  }, [product_id, user, loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
      setCropping(true); // Trigger cropping functionality
    }
  };

  const handleCropComplete = async () => {
    if (croppedImage) {
      const file = await fetch(croppedImage).then(r => r.blob());
      setImage(new File([file], 'cropped-image.png', { type: file.type }));
      setCropping(false); // Stop cropping
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user || !user.token) {
      setError('User not authenticated');
      return;
    }
  
    try {
      let imageUrl = product?.imageUrl;
  
      if (image) {
        imageUrl = await uploadToFirebase(image);
        if (!imageUrl) {
          throw new Error('Image upload failed');
        }
      }
  
      // Verify all required fields are set
      if (!title || !description || !price || !product_id) {
        throw new Error('Missing required fields');
      }
  
      await axios.post('/api/reviews', {
        productId: product_id,  // Ensure this is the correct value
        name: title,
        description,
        price,
        imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      setSuccess('Changes submitted for review');
    } catch (error) {
      console.error('Error submitting changes:', error.response?.data || error.message);
      setError('Failed to submit changes');
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">Edit Product</Typography>
      {product && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: '1rem' }}
          />
          {imagePreview && !cropping && (
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={imagePreview}
                alt="Product Image Preview"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Current Image Preview
                </Typography>
              </CardContent>
            </Card>
          )}
          {cropping && (
            <div style={{ position: 'relative', width: '100%', height: 400 }}>
              <Cropper
                image={imagePreview || ''}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={() => handleCropComplete()}
                style={{ containerStyle: { height: '100%', width: '100%' } }}
              />
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Submit for Review
          </Button>
        </form>
      )}
      {error && (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
          <Alert onClose={() => setSuccess(null)} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ProductDetail;

