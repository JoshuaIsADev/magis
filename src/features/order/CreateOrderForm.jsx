import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import { useUser } from '../authentication/useUser';
import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import Errors from '../../ui/Errors';
import Spinner from '../../ui/Spinner';
import { useCreateOrder } from './useCreateOrder';

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
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
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
        <Label htmlFor='streetNumber'>Street number</Label>
        <Input
          type='text'
          id='streetNumber'
          autoComplete='streetNumber'
          disabled={isPending}
          {...register('streetNumber', { required: 'This field is required' })}
        ></Input>
        {errors?.streetNumber?.message && (
          <Errors>{errors.streetNumber.message}</Errors>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor='state'>State</Label>
        <Input
          type='text'
          id='state'
          autoComplete='state'
          disabled={isPending}
          {...register('state', { required: 'This field is required' })}
        ></Input>
        {errors?.state?.message && <Errors>{errors.state.message}</Errors>}
      </FormRow>
      <FormRow>
        <Label htmlFor='zipCode'>Zip code</Label>
        <Input
          type='text'
          id='zipCode'
          autoComplete='zip'
          disabled={isPending}
          {...register('zipCode', { required: 'This field is required' })}
        ></Input>
        {errors?.zipCode?.message && <Errors>{errors.fullName.message}</Errors>}
      </FormRow>
      <FormRow>
        {isPending && <Spinner />}
        <button disabled={isPending}>Place order</button>
      </FormRow>
    </Form>
  );
}

export default CreateOrderForm;
