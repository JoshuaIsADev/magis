import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMainImage } from './useMainImage';
import Heading from '../../ui/Heading';
import Column from '../../ui/Column';

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
  padding-bottom: 2rem;
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
    <Column $variation='productCard'>
      <Info>
        <Heading as='h3'>{name}</Heading>
        <p>{designer}</p>
        <p>${unitPrice}</p>
      </Info>
      <Link
        to={`/product/${productId}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <Img src={isHovered ? mainImage[1] : mainImage[0]} alt='product' />
        </div>
      </Link>
    </Column>
  );
}

export default ProductCard;
