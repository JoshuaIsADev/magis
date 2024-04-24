import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMainImage } from './useMainImage';
import Heading from '../../ui/Heading';
import Column from '../../ui/Column';

const Img = styled.img`
  max-width: 40rem;
  aspect-ratio: 1;
  object-fit: contain;
  padding: 2rem 4rem;
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
      <Heading as='h3'>{name}</Heading>
      <p>{designer}</p>
      <p>${unitPrice}</p>
      <Link
        to={`/product/${productId}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Img src={isHovered ? mainImage[1] : mainImage[0]} alt='product' />
      </Link>
    </Column>
  );
}

export default ProductCard;
