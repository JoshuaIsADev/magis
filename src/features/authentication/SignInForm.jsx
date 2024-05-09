import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useState } from 'react';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import { useSignIn } from './useSignIn';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import StyledLink from '../../ui/StyledLink';
import Errors from '../../ui/Errors';

const StyledSignInForm = styled.form`
  grid-area: form;
  display: flex;
  flex-direction: column;
  border-left: var(--border);
  padding: var(--cell);
  min-height: 80vh;
`;

const Container = styled.div`
  grid-area: container;
  border-left: var(--border);
  border-right: var(--border);
  padding: var(--cell);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 3rem;
  gap: 0.5rem;
`;

function SignInForm() {
  const { signIn, isPending } = useSignIn();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    signIn(data, { onSuccess: (data) => reset() });
  }

  return (
    <>
      <StyledSignInForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            autoComplete='email'
            disabled={isPending}
            {...register('email', {
              required: 'This field is rquired',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            })}
          ></Input>
          {errors?.email?.message && <Errors>{errors.email.message}</Errors>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            autoComplete='password'
            disabled={isPending}
            {...register('password', { required: 'This field is rquired' })}
          ></Input>
          {errors?.password?.message && (
            <Errors>{errors.password.message}</Errors>
          )}
        </InputContainer>

        {isPending && <Spinner />}
        <Button $variation='primary' disabled={isPending}>
          Sign in
        </Button>
      </StyledSignInForm>
      <Container>
        <p>
          Not yet a member?
          <StyledLink $variation='primaryHeading' to='/signup'>
            Sign up here
          </StyledLink>
        </p>
      </Container>
    </>
  );
}

export default SignInForm;
