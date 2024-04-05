import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import styled from 'styled-components';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import { useSignIn } from './useSignIn';
import Spinner from '../../ui/Spinner';
import Errors from '../../ui/Errors';
import { useSignUp } from './useSignUp';

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
`;

function SignUpForm() {
  const { signUp, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor='fullName'>Full name</Label>
        <Input
          type='text'
          id='fullName'
          autoComplete='namel'
          {...register('fullName', { required: 'This field is required' })}
        ></Input>
        {errors?.fullName?.message && (
          <Errors>{errors.fullName.message}</Errors>
        )}
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          autoComplete='email'
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
        <Label htmlFor='password'>Password (min 8 characters)</Label>
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum 8 characters',
            },
          })}
        ></Input>
        {errors?.password?.message && (
          <Errors>{errors.password.message}</Errors>
        )}
        <Label htmlFor='passwordConfirm'>Confirm password</Label>
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords needs to match',
          })}
        ></Input>
        {errors?.passwordConfirm?.message && (
          <Errors>{errors.passwordConfirm.message}</Errors>
        )}
      </FormRow>
      <FormRow>
        <button>{'Sign up'}</button>
      </FormRow>
    </Form>
  );
}

export default SignUpForm;
