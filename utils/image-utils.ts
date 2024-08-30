// // utils/image-utils.ts

// // Utility function to create an image from a URL or base64 string
// const createImage = (url: string): Promise<HTMLImageElement> => {
//     return new Promise<HTMLImageElement>((resolve, reject) => {
//       const img = new Image();
//       img.src = url;
//       img.onload = () => resolve(img);
//       img.onerror = reject;
//     });
//   };
  
//   // Function to get cropped image as a base64 string
//   export const getCroppedImg = async (imageSrc: string, crop: { x: number, y: number, width: number, height: number }, zoom: number): Promise<string> => {
//     try {
//       const image = await createImage(imageSrc);
  
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
  
//       if (!ctx) throw new Error('Failed to get canvas context');
  
//       canvas.width = crop.width * zoom;
//       canvas.height = crop.height * zoom;
  
//       ctx.drawImage(
//         image,
//         crop.x,
//         crop.y,
//         crop.width * zoom,
//         crop.height * zoom,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );
  
//       return canvas.toDataURL();
//     } catch (error) {
//       console.error('Error cropping image:', error);
//       throw error;
//     }
//   };
export const getCroppedImg = async (imageSrc: string, crop: any) => {
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
