import { useState, useEffect } from 'react';

export function useMainImage(images) {
  const [mainImage, setMainImage] = useState(null);
  const [mainSecondaryImage, setMainSecondaryImage] = useState(null);

  useEffect(() => {
    async function fetchMainImage() {
      try {
        const mainImages = await getMainImage(images);
        if (mainImages.length > 0) {
          setMainImage(mainImages[0]);
          setMainSecondaryImage(mainImages[1]);
        }
      } catch (error) {
        console.error('Error fetching main image:', error);
      }
    }

    fetchMainImage();
    return () => {};
  }, [images]);

  return [mainImage, mainSecondaryImage];
}

async function getMainImage(images) {
  let mainImageArray = [];
  if (images !== undefined) {
    for (const image of images) {
      if (image.includes('main')) {
        mainImageArray.push(image);
      }
    }
  }
  return mainImageArray;
}
