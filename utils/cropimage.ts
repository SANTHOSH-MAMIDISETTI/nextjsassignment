import Cropper from 'react-easy-crop';

const getCroppedImg = async (imageSrc: string, crop: any, zoom: number) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = imageSrc;

  const cropArea = {
    width: crop.width,
    height: crop.height,
    x: crop.x,
    y: crop.y,
  };

  await new Promise((resolve) => {
    image.onload = () => {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );
      resolve(null);
    };
  });

  return canvas.toDataURL('image/png');
};

export default getCroppedImg;
