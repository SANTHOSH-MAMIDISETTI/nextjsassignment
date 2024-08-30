import React, { useState, useEffect } from 'react';
import Cropper from 'react-image-crop';
// import 'react-image-crop/dist/ReactImageCrop/.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedFile: File) => void;
  onClose: () => void;
  open: boolean;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageUrl, onCrop, onClose, open }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  
  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setImage(img);
    }
  }, [imageUrl]);

  const handleCropComplete = (crop: Crop) => {
    setCompletedCrop(crop);
  };

  const handleSave = () => {
    if (completedCrop && image) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );
      canvas.toBlob(blob => {
        if (blob) {
          const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
          onCrop(croppedFile);
        }
      }, 'image/jpeg');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Crop Image
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {image && (
          <Cropper
            src={imageUrl}
            crop={crop}
            onChange={setCrop}
            onComplete={handleCropComplete}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;
