import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import styled from 'styled-components';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import { useSignIn } from './useSignIn';
import Spinner from '../../ui/Spinner';

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
`;

function SignUpForm() {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
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
      </FormRow>
      <FormRow>
        <button>{'Sign up'}</button>
      </FormRow>
    </Form>
  );
}

export default SignUpForm;
