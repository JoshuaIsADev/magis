import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import { useSignIn } from './useSignIn';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import StyledLink from '../../ui/StyledLink';
import Errors from '../../ui/Errors';

const StyledSignInForm = styled.form`
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: var(--bottom);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            autoComplete='password'
            disabled={isPending}
            {...register('password', { required: 'This field is required' })}
          ></Input>
          {errors?.password?.message && (
            <Errors>{errors.password.message}</Errors>
          )}
        </InputContainer>
        {isPending && <Spinner />}
        <Button $variation='primary' disabled={isPending}>
          Sign in
        </Button>
        <p>
          Not yet a member?
          <StyledLink $variation='secondary' to='/signup'>
            Sign up here
          </StyledLink>
        </p>
      </StyledSignInForm>
    </>
  );
}

export default SignInForm;
