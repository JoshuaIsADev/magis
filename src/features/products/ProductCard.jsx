import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMainImage } from './useMainImage';
import Heading from '../../ui/Heading';

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  /* width: 35rem; */
  /* max-width: 40rem; */
  height: 100%;
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.25rem;
`;

function ProductCard({ product }) {
  const { id: productId, name, designer, unitPrice, image } = product;
  const mainImage = useMainImage(image);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <StyledProductCard>
      <Link
        to={`/product/${productId}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <Img src={isHovered ? mainImage[1] : mainImage[0]} alt='product' />
        </div>
      </Link>
      <Info>
        <Heading as='h3'>{name}</Heading>
        <p>{designer}</p>
        <p>${unitPrice}</p>
      </Info>
    </StyledProductCard>
  );
}

export default ProductCard;
