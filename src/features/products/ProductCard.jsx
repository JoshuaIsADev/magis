import { useState } from 'react';
import styled from 'styled-components';
import { useMainImage } from './useMainImage';
import Heading from '../../ui/Heading';
import Img from '../../ui/Img';
import StyledLink from '../../ui/StyledLink';

const StyledProductCard = styled.div`
  grid-column: span 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: var(--color-grey-0);
`;

const ImageContainer = styled.div`
  padding: var(--cell);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--cell);
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
      <InfoContainer>
        <InfoRow>
          <Heading as='h3'>{name}</Heading>
          <p>${unitPrice}</p>
        </InfoRow>
        <InfoRow>
          <p>{designer}</p>
          <StyledLink
            $variation='underline'
            to={`/product/${productId}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Shop
          </StyledLink>
        </InfoRow>
      </InfoContainer>
    </StyledProductCard>
  );
}

export default ProductCard;
