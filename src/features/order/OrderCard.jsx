import styled from 'styled-components';
import Img from '../../ui/Img';
import { capitalize } from '../../utils/capitalize';

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
`;

const ItemsInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
`;

function OrderCard({ orderItem }) {
  return (
    <ItemsContainer key={orderItem.selectedProductId}>
      <Img $variation='orderCard' src={orderItem.mainImage} alt='product' />
      <ItemsInfo>
        <p>color: {capitalize(orderItem.color)}</p>
        <p>
          quanity: {orderItem.quantity} x ${orderItem.unitPrice}
        </p>
      </ItemsInfo>
    </ItemsContainer>
  );
}

export default OrderCard;
