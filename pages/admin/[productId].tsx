

// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
// import Cropper from 'react-easy-crop';

// const ProductDetailPage: React.FC = () => {
//   const router = useRouter();
//   const { productId } = router.query;

//   const [productName, setProductName] = useState<string>('');
//   const [productPrice, setProductPrice] = useState<string>('');
//   const [productDescription, setProductDescription] = useState<string>('');
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [croppedImage, setCroppedImage] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<boolean>(false);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (productId) {
//         try {
//           const response = await axios.get(`/api/products/${productId}`);
//           const product = response.data;
//           setProductName(product.name || '');
//           setProductPrice(product.price ? String(product.price) : '');
//           setProductDescription(product.description || '');
//           setImageSrc(product.image || null);
//         } catch (error) {
//           setError('Error fetching product details');
//           console.error('Error fetching product details:', error);
//         }
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCropChange = (crop: any) => {
//     setCrop(crop);
//   };

//   const handleZoomChange = (zoom: number) => {
//     setZoom(zoom);
//   };

//   const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const getCroppedImg = async (imageSrc: string, crop: any) => {
//     const image = new Image();
//     image.src = imageSrc;
//     await new Promise((resolve) => (image.onload = resolve));
    
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     if (!ctx) {
//       throw new Error('Could not get canvas context');
//     }

//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;

//     canvas.width = crop.width;
//     canvas.height = crop.height;

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );

//     return new Promise<File>((resolve) => {
//       canvas.toBlob((blob) => {
//         if (blob) {
//           resolve(new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' }));
//         }
//       }, 'image/jpeg');
//     });
//   };

//   const handleCropAndSave = async () => {
//     if (imageSrc && croppedAreaPixels) {
//       try {
//         const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
//         setCroppedImage(croppedImg);
//         await handleSave(croppedImg);
//       } catch (error) {
//         setError('Error processing image');
//         console.error('Error processing image:', error);
//       }
//     } else {
//       await handleSave(null);
//     }
//   };

//   // const handleSave = async (imageFile: File | null) => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append('name', productName.trim());
//   //     formData.append('price', productPrice.trim());
//   //     formData.append('description', productDescription.trim());

//   //     if (imageFile) {
//   //       formData.append('image', imageFile);
//   //     } else if (imageSrc && !imageSrc.startsWith('data:')) {
//   //       formData.append('oldImageUrl', imageSrc);
//   //     }

//   //     const response = await axios.put(`/api/products/${productId}`, formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });

//   //     if (response.status === 200) {
//   //       setSuccess(true);
        
//   //       // Update the imageSrc state with the updated image URL
//   //       if (response.data.image) {
//   //         setImageSrc(response.data.image);
//   //       }

//   //       router.push('/admin/products');
//   //     } else {
//   //       setError('Failed to update product');
//   //     }
//   //   } catch (error) {
//   //     setError('Error updating product');
//   //     console.error('Error updating product:', error);
//   //   }
//   // };
//   const handleSave = async (imageFile: File | null) => {
//     try {
//       const formData = new FormData();
//       formData.append('name', productName.trim());
//       formData.append('price', productPrice.trim());
//       formData.append('description', productDescription.trim());
  
//       if (imageFile) {
//         formData.append('image', imageFile);
//         console.log('Image file appended:', imageFile);
//       } else if (imageSrc && !imageSrc.startsWith('data:')) {
//         formData.append('oldImageUrl', imageSrc);
//         console.log('Old image URL appended:', imageSrc);
//       }
  
//       const response = await axios.put(`/api/products/${productId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       if (response.status === 200) {
//         setSuccess(true);
        
//         // Update the imageSrc state with the updated image URL
//         if (response.data.image) {
//           setImageSrc(response.data.image);
//         }
  
//         router.push('/admin/products');
//       } else {
//         setError('Failed to update product');
//       }
//     } catch (error) {
//       setError('Error updating product');
//       console.error('Error updating product:', error);
//     }
//   };
  

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Edit Product
//       </Typography>
//       {error && (
//         <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
//           <Alert onClose={() => setError(null)} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       )}
//       {success && (
//         <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
//           <Alert onClose={() => setSuccess(false)} severity="success">
//             Product updated successfully!
//           </Alert>
//         </Snackbar>
//       )}
//       <TextField
//         label="Product Name"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Product Price"
//         type="text"
//         value={productPrice}
//         onChange={(e) => setProductPrice(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Product Description"
//         value={productDescription}
//         onChange={(e) => setProductDescription(e.target.value)}
//         fullWidth
//         margin="normal"
//         multiline
//         rows={4}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         style={{ marginTop: '16px' }}
//       />
//       {imageSrc && (
//         <div style={{ position: 'relative', width: '100%', height: 400, marginTop: '16px' }}>
//           <Cropper
//             image={imageSrc}
//             crop={crop}
//             zoom={zoom}
//             aspect={1}
//             onCropChange={handleCropChange}
//             onZoomChange={handleZoomChange}
//             onCropComplete={onCropComplete}
//           />
//         </div>
//       )}
//       <Button variant="contained" color="primary" onClick={handleCropAndSave} style={{ marginTop: '16px' }}>
//         Save
//       </Button>
//     </Container>
//   );
// };

// export default ProductDetailPage;


import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar, Alert, Card, CardMedia, CardContent } from '@mui/material';
import Cropper from 'react-easy-crop';
import { uploadToFirebase } from '../../utils/firebase'; // Adjust path as needed
import getCroppedImg from '../../utils/cropimage'; // Ensure this utility function is available

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [cropping, setCropping] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await axios.get(`/api/products/${productId}`);
          const product = response.data;
          setProductName(product.name || '');
          setProductPrice(product.price ? String(product.price) : '');
          setProductDescription(product.description || '');
          setImageSrc(product.image || null);
        } catch (error) {
          setError('Error fetching product details');
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setImagePreview(reader.result as string); // Set image preview
        setCropping(true); // Start cropping
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropChange = (crop: any) => {
    setCrop(crop);
  };

  const handleZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async (imageSrc: string, crop: any) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise<File>((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' }));
          } else {
            reject(new Error('Could not create blob from canvas'));
          }
        }, 'image/jpeg');
      };

      image.onerror = () => {
        reject(new Error('Could not load image'));
      };
    });
  };

  const handleCropAndSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
        setCroppedImage(croppedImg);
        await handleSave(croppedImg);
      } catch (error) {
        setError('Error processing image');
        console.error('Error processing image:', error);
      }
    } else {
      await handleSave(null);
    }
  };

  const handleSave = async (imageFile: File | null) => {
    try {
      const formData = new FormData();
      formData.append('name', productName.trim());
      formData.append('price', productPrice.trim());
      formData.append('description', productDescription.trim());

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imageSrc && !imageSrc.startsWith('data:')) {
        formData.append('oldImageUrl', imageSrc);
      }

      const response = await axios.put(`/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        if (response.data.image) {
          setImageSrc(response.data.image);
        }
        router.push('/admin/products');
      } else {
        setError('Failed to update product');
      }
    } catch (error) {
      setError('Error updating product');
      console.error('Error updating product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Product updated successfully!
          </Alert>
        </Snackbar>
      )}
      <form onSubmit={(e) => { e.preventDefault(); handleCropAndSave(); }}>
        <TextField
          fullWidth
          label="Product Name"
          variant="outlined"
          margin="normal"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          margin="normal"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '1rem' }}
        />
        {imagePreview && !cropping && (
          <Card style={{ marginTop: '16px' }}>
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
          <div style={{ position: 'relative', width: '100%', height: 400, marginTop: '16px' }}>
            <Cropper
              image={imagePreview}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={handleCropChange}
              onZoomChange={handleZoomChange}
              onCropComplete={onCropComplete}
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
    </Container>
  );
};

export default ProductDetailPage;
