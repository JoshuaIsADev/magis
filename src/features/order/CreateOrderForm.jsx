import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import { useUser } from '../authentication/useUser';
import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import Errors from '../../ui/Errors';
import Spinner from '../../ui/Spinner';
import { useCreateOrder } from './useCreateOrder';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { Heading } from '../../ui/Heading';

const StyledCreateOrderForm = styled.form`
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--bottom);
  @media (max-width: 1000px) {
    grid-column: 1 / span 3;
    /* grid-row: 2 / span 2; */
  }
  @media (max-width: 500px) {
    grid-column: 1 / span 6;
    grid-row: 2 / span 1;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
`;

function CreateOrderForm() {
  const { user, isAuthenticated } = useUser();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { cartItems, totalPrice } = useContext(CartContext);
  const { isPending, createOrder } = useCreateOrder();

  const orderedProducts = JSON.stringify(cartItems);
  const userId = JSON.stringify(user.id).replace(/^"|"$/g, '');

  function onSubmit(data) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const orderNumber = `${userId.slice(
      0,
      7
    )}-${year}${month}${day}${hours}${minutes}`;

    data.orderNumber = orderNumber;
    data.orderedProducts = orderedProducts;
    data.user_id = userId;
    data.totalPrice = totalPrice;
    createOrder(data, { onSuccess: (data) => reset() });
  }

  return (
    <StyledCreateOrderForm onSubmit={handleSubmit(onSubmit)}>
      <Heading as='h3' $variation='padding'>
        Your info
      </Heading>
      <InputContainer>
        <Label htmlFor='fullName'>Full name</Label>
        <Input
          type='text'
          id='fullName'
          autoComplete='name'
          disabled={isPending}
          {...register('fullName', { required: 'This field is required' })}
        ></Input>
        {errors?.fullName?.message && (
          <Errors>{errors.fullName.message}</Errors>
        )}
      </InputContainer>
      <InputContainer>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='text'
          id='email'
          autoComplete='email'
          disabled={isPending}
          defaultValue={user.email}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        ></Input>
        {errors?.email?.message && <Errors>{errors.email.message}</Errors>}
      </InputContainer>
      <InputContainer>
        <Label htmlFor='streetNumber'>Street number</Label>
        <Input
          type='text'
          id='streetNumber'
          autoComplete='streetNumber'
          disabled={isPending}
          {...register('streetNumber', {
            required: 'This field is required',
          })}
        ></Input>
        {errors?.streetNumber?.message && (
          <Errors>{errors.streetNumber.message}</Errors>
        )}
      </InputContainer>
      <InputContainer>
        <Label htmlFor='state'>State</Label>
        <Input
          type='text'
          id='state'
          autoComplete='state'
          disabled={isPending}
          {...register('state', { required: 'This field is required' })}
        ></Input>
        {errors?.state?.message && <Errors>{errors.state.message}</Errors>}
      </InputContainer>
      <InputContainer>
        <Label htmlFor='zipCode'>Zip code</Label>
        <Input
          type='text'
          id='zipCode'
          autoComplete='zip'
          disabled={isPending}
          {...register('zipCode', { required: 'This field is required' })}
        ></Input>
        {errors?.zipCode?.message && <Errors>{errors.fullName.message}</Errors>}
      </InputContainer>
      {isPending && <Spinner />}

      <Button $variation='primary' disabled={isPending}>
        Place order
      </Button>
    </StyledCreateOrderForm>
  );
}

export default CreateOrderForm;
