import styled, { keyframes } from 'styled-components';
import Button from './Button';
import { useState } from 'react';
import Img from './Img';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledImageGallery = styled.div`
  width: 100%;
`;

const GalleryButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-bottom: 2rem;
`;

const ImageContainer = styled.div`
  position: relative;
  .fade-in {
    animation: ${fadeIn} 0.5s ease-in forwards;
  }
  .fade-out {
    animation: ${fadeOut} 0.5s ease-out forwards;
  }
`;

function ImageGallery({ images }) {
  const [showImage, setShowImage] = useState(images[0]);
  const [fadeState, setFadeState] = useState('fade-in');

  function handleClick(index) {
    setFadeState('fade-out');
    setTimeout(() => {
      setShowImage(images[index]);
      setFadeState('fade-in');
    }, 300);
  }
  console.log(showImage);

  return (
    <StyledImageGallery>
      <GalleryButtonsContainer>
        {images.map((image, index) => (
          <Button
            $variation='gallery'
            key={index}
            onClick={() => handleClick(index)}
          ></Button>
        ))}
      </GalleryButtonsContainer>
      <ImageContainer>
        <Img src={showImage} $variation='gallery' className={fadeState}></Img>
      </ImageContainer>
    </StyledImageGallery>
  );
}

export default ImageGallery;
