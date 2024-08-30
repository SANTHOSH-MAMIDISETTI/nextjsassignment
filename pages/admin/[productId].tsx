
// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
// import Cropper from 'react-easy-crop';
// import 'react-image-crop/dist/ReactCrop.css';

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
//           setProductPrice(product.price ? String(product.price) : ''); // Ensure it's a string
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

//   const handleSave = async (imageFile: File | null) => {
//     try {
//       const formData = new FormData();
//       formData.append('name', productName.trim());
//       formData.append('price', productPrice.trim()); // Ensure price is a string
//       formData.append('description', productDescription.trim());

//       if (imageFile) {
//         formData.append('image', imageFile);
//       } else if (imageSrc && !imageSrc.startsWith('data:')) {
//         formData.append('oldImageUrl', imageSrc);
//       }

//       const response = await axios.put(`/api/products/${productId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setSuccess(true);
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
import { Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import Cropper from 'react-easy-crop';

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
    await new Promise((resolve) => (image.onload = resolve));
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get canvas context');
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

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' }));
        }
      }, 'image/jpeg');
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
        
        // Update the imageSrc state with the updated image URL
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
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Product Price"
        type="text"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Product Description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: '16px' }}
      />
      {imageSrc && (
        <div style={{ position: 'relative', width: '100%', height: 400, marginTop: '16px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={handleCropChange}
            onZoomChange={handleZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleCropAndSave} style={{ marginTop: '16px' }}>
        Save
      </Button>
    </Container>
  );
};

export default ProductDetailPage;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { Container, Typography, TextField, Button, Snackbar, Alert, CardMedia, Card, CardContent } from '@mui/material';
// import { useAuth } from '../../lib/useauth'; // Adjust path as needed
// import { uploadToFirebase } from '../../utils/firebase'; // Adjust path as needed
// import Cropper from 'react-easy-crop'; // Add a cropper library for image editing
// // import getCroppedImg from '../../utils/cropimage'; // Adjust path as needed

// const ProductDetail = () => {
//   const router = useRouter();
//   const { user, loading } = useAuth();
//   const { product_id } = router.query;
//   const [product, setProduct] = useState<any>(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [croppedImage, setCroppedImage] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [cropping, setCropping] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!user || !user.token) {
//         setError('User not authenticated');
//         return;
//       }

//       try {
//         const response = await axios.get(`/api/products/${product_id}`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         const productData = response.data;
//         setProduct(productData);
//         setTitle(productData.name);
//         setDescription(productData.description);
//         setPrice(productData.price);
//         setImagePreview(productData.imageUrl);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         setError('Failed to fetch product details');
//       }
//     };

//     if (product_id && !loading) {
//       fetchProduct();
//     }
//   }, [product_id, user, loading]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//       setCropping(true);
//     }
//   };

//   const handleCropComplete = async () => {
//     if (croppedImage) {
//       const file = await fetch(croppedImage).then(r => r.blob());
//       setImage(new File([file], 'cropped-image.png', { type: file.type }));
//       setCropping(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user || !user.token) {
//       setError('User not authenticated');
//       return;
//     }

//     try {
//       let imageUrl = product?.imageUrl;

//       if (image) {
//         imageUrl = await uploadToFirebase(image);
//         if (!imageUrl) {
//           throw new Error('Image upload failed');
//         }
//       }

//       if (!title || !description || !price || !product_id) {
//         throw new Error('Missing required fields');
//       }

//       await axios.put(`/api/products/${product_id}`, {
//         name: title,
//         description,
//         price,
//         imageUrl,
//       }, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       setSuccess('Product updated successfully');
//     } catch (error) {
//       console.error('Error updating product:', error.response?.data || error.message);
//       setError('Failed to update product');
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Container>
//       <Typography variant="h4">Edit Product</Typography>
//       {product && (
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Product Title"
//             variant="outlined"
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             variant="outlined"
//             margin="normal"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Price"
//             variant="outlined"
//             margin="normal"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ marginTop: '1rem' }}
//           />
//           {imagePreview && !cropping && (
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={imagePreview}
//                 alt="Product Image Preview"
//               />
//               <CardContent>
//                 <Typography variant="body2" color="textSecondary">
//                   Current Image Preview
//                 </Typography>
//               </CardContent>
//             </Card>
//           )}
//           {cropping && (
//             <div style={{ position: 'relative', width: '100%', height: 400 }}>
//               <Cropper
//                 image={imagePreview}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={4 / 3}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={() => handleCropComplete()}
//                 style={{ containerStyle: { height: '100%', width: '100%' } }}
//               />
//             </div>
//           )}
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             style={{ marginTop: '1rem' }}
//           >
//             Update Product
//           </Button>
//         </form>
//       )}
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
//     </Container>
//   );
// };

// export default ProductDetail;
