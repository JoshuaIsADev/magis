import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMainImage } from './useMainImage';

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
`;

const StyledProductCard = styled.div`
  padding-bottom: var(--padding-l);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
`;

function ProductCard({ product }) {
  const { id: productId, name, designer, unitPrice, image } = product;

  const mainImage = useMainImage(image);

  return (
    <StyledProductCard>
      <Link to={`/product/${productId}`}>
        <div>{<Img src={mainImage[0]} alt='product' />}</div>
        <Info>
          <p className='bold'>{name}</p>
          <p>{designer}</p>
          <p>${unitPrice}</p>
        </Info>
      </Link>
    </StyledProductCard>
  );
}

export default ProductCard;
