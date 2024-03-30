import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMainImage } from '../../utils/getMainImage';
import { Link } from 'react-router-dom';

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
  const {
    id: productId,
    name,
    designer,
    category,
    inStock,
    unitPrice,
    image,
  } = product;

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    getMainImage(image).then((image) => {
      setMainImage(image[0]);
    });
  }, [image]);

  return (
    <StyledProductCard>
      <Link to={`/product/${productId}`}>
        <div>{<Img src={mainImage} alt='product' />}</div>
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
