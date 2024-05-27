import { useState } from 'react';
import styled from 'styled-components';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';
import Img from '../../ui/Img';
import StyledLink from '../../ui/StyledLink';

const StyledProductCard = styled.div`
  grid-column: span 1;
  display: flex;
  background-color: var(--color-grey-0);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 1400px) {
    grid-column: span 2;
  }
  @media (max-width: 600px) {
    grid-column: span 3;
  }
`;

const ImageContainer = styled.div`
  padding: 4rem;
  margin-bottom: 2rem;
  /* padding: var(--cell); */
  @media (max-width: 800px) {
    padding: 2rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: var(--line-height);
`;

function ProductCard({ product }) {
  const { id: productId, name, designer, unitPrice, image } = product;
  const mainImage = product.variants[0].variantImage;
  const secondaryImage =
    product.variants[1]?.variantImage || product.variants[0].variantImage;

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
            src={isHovered ? secondaryImage : mainImage}
            alt='product'
          />
        </StyledLink>
      </ImageContainer>
    </StyledProductCard>
  );
}

export default ProductCard;
