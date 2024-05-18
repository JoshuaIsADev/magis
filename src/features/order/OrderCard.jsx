import styled from 'styled-components';
import Img from '../../ui/Img';
import { capitalize } from '../../utils/capitalize';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  padding: var(--cell);
  border-bottom: var(--border);
  &:last-child {
    border-bottom: none;
  }
`;

const ItemsInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8rem;
  align-items: center;
`;

function OrderCard({ orderItem }) {
  return (
    <ItemsContainer key={orderItem.selectedProductId}>
      <Img $variation='orderCard' src={orderItem.image} alt='product' />
      <ItemsInfo>
        <Heading as='h3'>{orderItem.name}</Heading>
        <p>{capitalize(orderItem.color)}</p>
        <p>
          {orderItem.quantity} x ${orderItem.unitPrice}
        </p>
      </ItemsInfo>
    </ItemsContainer>
  );
}

export default OrderCard;
