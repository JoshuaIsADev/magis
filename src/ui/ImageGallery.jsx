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

const ColumnButtons = styled.div`
  grid-column: 5 / span 1;
  display: flex;
  align-items: flex-start;
  justify-content: left;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ImageContainer = styled.div`
  grid-column: 1 / span 3;
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
    <>
      <ImageContainer>
        <Img src={showImage} $variation='gallery' className={fadeState}></Img>
      </ImageContainer>
      <ColumnButtons>
        {images.map((image, index) => (
          <Button
            $variation='gallery'
            key={index}
            onClick={() => handleClick(index)}
          ></Button>
        ))}
      </ColumnButtons>
    </>
  );
}

export default ImageGallery;
