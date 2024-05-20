import styled from 'styled-components';
import Img from '../../ui/Img';
import { capitalize } from '../../utils/capitalize';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';

const StyledOrderCard = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function OrderCard({ orderItem }) {
  return (
    <StyledOrderCard key={orderItem.selectedProductId}>
      <InfoContainer>
        <Heading as='h3'>{orderItem.name}</Heading>
        <p>{capitalize(orderItem.color)}</p>
        <p>
          {orderItem.quantity} x ${orderItem.unitPrice}
        </p>
      </InfoContainer>
      <Img $variation='productCard' src={orderItem.image} alt='product' />
    </StyledOrderCard>
  );
}

export default OrderCard;
