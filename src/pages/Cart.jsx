import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import StyledLink from '../ui/StyledLink';
import CartForm from '../features/cart/CartForm';
import useProductFinder from '../features/products/useProductFinder';
import { constructCartItem } from '../utils/constructCartItem';
import Section from '../ui/Section';
import Row from '../ui/Row';
import SectionHeading from '../ui/SectionHeading';
import Hr from '../ui/Hr';
import Column from '../ui/Column';
import Heading from '../ui/Heading';
import Button from '../ui/Button';

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  const getProduct = useProductFinder(products);
  const taxes = (Number(totalPrice) * 0.08).toFixed(2);
  const finalTotalPrice = (Number(totalPrice) + Number(taxes)).toFixed(2);

  const combinedCartItems = [];

  if (cartItems.length !== 0) {
    cartItems.forEach((item) => {
      const existingItem = combinedCartItems.find(
        (i) => i.selectedProductId === item.selectedProductId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        combinedCartItems.push(constructCartItem(item, getProduct));
      }
    });
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Section>
        <SectionHeading text='Cart' />
        <Hr />
        <Row>
          <Column $variation='order'></Column>
          <Column $variation='order'>
            <Heading as='h3'>Name</Heading>
          </Column>
          <Column $variation='order'>
            <Heading as='h3'>Color</Heading>
          </Column>
          <Column $variation='order'>
            <Heading as='h3'>Unit price</Heading>
          </Column>
          <Column $variation='order'>
            <Heading as='h3'>Quantity</Heading>
          </Column>
          <Column $variation='order'>
            <Heading as='h3'>Delete</Heading>
          </Column>
        </Row>
        {combinedCartItems.map((combinedCartItem) => (
          <CartForm
            key={combinedCartItem.id + combinedCartItem.color}
            name={combinedCartItem.name}
            selectedProductId={combinedCartItem.selectedProductId}
            color={combinedCartItem.color}
            quantity={combinedCartItem.quantity}
            unitPrice={combinedCartItem.unitPrice}
            mainImage={combinedCartItem.mainImage}
            combinedCartItem={combinedCartItem}
          />
        ))}
      </Section>
      <Section>
        <SectionHeading text='Order summary' />
        <Hr />
        <Row>
          <Column $variation='order'>
            <Heading as='h3'>Subtotal</Heading>
          </Column>
          <Column $variation='order'>
            <p>${totalPrice.toFixed(2)}</p>
          </Column>
        </Row>
        <Row>
          <Column $variation='order'>
            <Heading as='h3'>Taxes</Heading>
          </Column>
          <Column $variation='order'>
            <p>${taxes}</p>
          </Column>
        </Row>
        <Row>
          <Column $variation='order'>
            <Heading as='h3'>Total(including taxes)</Heading>
          </Column>
          <Column $variation='order'>
            <p>${finalTotalPrice}</p>
          </Column>
        </Row>
        <Row>
          <Column $variation='formSubmitButtons'>
            <StyledLink to='/checkout'>
              <Button $variation='primary'>Proceed to checkout</Button>
            </StyledLink>
          </Column>
        </Row>
      </Section>
    </>
  );
}

export default Cart;
