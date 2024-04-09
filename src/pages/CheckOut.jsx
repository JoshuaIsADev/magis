import { useContext, useMemo } from 'react';
import { CartContext } from '../context/cartContext';
import { capitalize } from '../utils/capitalize';
import { useProducts } from '../features/products/useProducts';
import styled from 'styled-components';
import Label from '../ui/Label';
import Form from '../ui/Form';
import Input from '../ui/Input';
import { useUser } from '../features/authentication/useUser';
import CreateOrderForm from '../features/order/CreateOrderForm';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

// const FormRow = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: left;
//   gap: 0.5rem;
// `;

function CheckOut() {
  const { isPending, products } = useProducts();
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user, isAuthenticated } = useUser();
  // console.log(cartItems, user);

  const getProduct = useMemo(() => {
    return (item) => {
      const itemId = Number(item.selectedProductId.split('-')[1]);
      return products.find((product) => product.id === itemId);
    };
  }, [products]);

  const combinedCartItems = [];

  cartItems.forEach((item) => {
    // combinedCartItems.find(
    //   (i) => i.selectedProductId === item.selectedProductId
    // );
    const productdata = getProduct(item);
    const mainImage = productdata.image.find((img) => img.includes('main'));
    combinedCartItems.push({
      selectedProductId: item.selectedProductId,
      quantity: item.quantity,
      color: capitalize(item.selectedProductId.split('-')[0]),
      name: productdata.name,
      unitPrice: productdata.unitPrice,
      mainImage,
      id: productdata.id,
    });
  });

  // console.log(combinedCartItems);

  return (
    <>
      <div>
        {combinedCartItems.map((combinedCartItem) => (
          <div key={combinedCartItem.id}>
            <Img src={combinedCartItem.mainImage} alt='product' />
            <p>{combinedCartItem.name}</p>
            <p>{combinedCartItem.color}</p>
            <p>{combinedCartItem.unitPrice}</p>
            <p>{combinedCartItem.quantity}</p>
            <p>
              {Number(combinedCartItem.quantity) *
                Number(combinedCartItem.unitPrice)}
            </p>
          </div>
        ))}
      </div>
      <CreateOrderForm />
      {/* <div>
        <Form>
          <FormRow>
            <Label htmlFor='fullName'>Full name</Label>
            <Input type='text' id='fullName' autoComplete='name'></Input>
          </FormRow>
          <FormRow>
            <Label htmlFor='fullName'>Email</Label>
            <Input
              type='text'
              id='email'
              autoComplete='email'
              defaultValue={user.email}
            ></Input>
          </FormRow>
          <FormRow>
            <Label htmlFor='streetNumber'>Street number</Label>
            <Input
              type='text'
              id='streetNumber'
              autoComplete='streetNumber'
            ></Input>
          </FormRow>
          <FormRow>
            <Label htmlFor='state'>State</Label>
            <Input type='text' id='state' autoComplete='state'></Input>
          </FormRow>
          <FormRow>
            <Label htmlFor='zip'>Zip code</Label>
            <Input type='text' id='zip' autoComplete='zip'></Input>
          </FormRow>
          <FormRow>
            <button>Place order</button>
          </FormRow>
        </Form>
      </div> */}
    </>
  );
}

export default CheckOut;
