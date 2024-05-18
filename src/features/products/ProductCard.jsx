import { useState } from 'react';
import styled from 'styled-components';
import { useMainImage } from './useMainImage';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';
import Img from '../../ui/Img';
import StyledLink from '../../ui/StyledLink';

const StyledProductCard = styled.div`
  grid-column: span 1;
  grid-template-columns: repeat(2, 1fr);
  display: flex;
  background-color: var(--color-grey-0);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ImageContainer = styled.div`
  padding: var(--cell);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
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
      <InfoContainer>
        <Heading as='h3'>{name}</Heading>
        <p>${unitPrice}</p>
        <p>{designer}</p>
        <StyledLink
          $variation='underline'
          to={`/product/${productId}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Shop
        </StyledLink>
      </InfoContainer>
      <ImageContainer>
        <StyledLink
          $variation='productCard'
          to={`/product/${productId}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Img
            $variation='productCard'
            src={isHovered ? mainImage[1] : mainImage[0]}
            alt='product'
          />
        </StyledLink>
      </ImageContainer>
    </StyledProductCard>
  );
}

export default ProductCard;
