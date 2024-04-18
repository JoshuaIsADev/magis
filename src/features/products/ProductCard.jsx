import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMainImage } from './useMainImage';

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 30rem;
  height: 100%;
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  text-align: center;
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
        <p className='bold'>{name}</p>
        <p>{designer}</p>
        <p>${unitPrice}</p>
      </Info>
    </StyledProductCard>
  );
}

export default ProductCard;
