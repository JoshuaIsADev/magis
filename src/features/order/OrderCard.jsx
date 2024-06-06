import styled from 'styled-components';
import Img from '../../ui/Img';
import { capitalize } from '../../utils/capitalize';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';

const StyledOrderCard = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    grid-column: span 2;
  }
  @media (max-width: 400px) {
    grid-column: span 3;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  padding: 2rem 0;
`;

function OrderCard({ orderItem }) {
  return (
    <StyledOrderCard key={orderItem.selectedProductId}>
      <InfoContainer>
        <Heading as='h2' $variation='bold'>
          {orderItem.name}
        </Heading>
        <p>{capitalize(orderItem.color)}</p>
        <p>
          {orderItem.quantity} x ${orderItem.unitPrice}
        </p>
      </InfoContainer>
      <ImageContainer>
        <Img $variation='productCard' src={orderItem.image} alt='product' />
      </ImageContainer>
    </StyledOrderCard>
  );
}

export default OrderCard;
