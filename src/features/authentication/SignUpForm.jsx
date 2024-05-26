import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Label from '../../ui/Label';
import StyledLink from '../../ui/StyledLink';
import Input from '../../ui/Input';
import { useSignUp } from './useSignUp';
import Spinner from '../../ui/Spinner';
import Errors from '../../ui/Errors';
import Button from '../../ui/Button';

const StyledSignUpForm = styled.form`
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: var(--bottom);
  @media (max-width: 1400px) {
    grid-column: span 2;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function SignUpForm() {
  const { signUp, isPending } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <>
      <StyledSignUpForm onSubmit={handleSubmit(onSubmit)}>
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
          <Label htmlFor='password'>Password (min 8 characters)</Label>
          <Input
            type='password'
            id='password'
            disabled={isPending}
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
        </InputContainer>
        <InputContainer>
          <Label htmlFor='passwordConfirm'>Confirm password</Label>
          <Input
            type='password'
            id='passwordConfirm'
            disabled={isPending}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'Passwords needs to match',
            })}
          ></Input>
          {errors?.passwordConfirm?.message && (
            <Errors>{errors.passwordConfirm.message}</Errors>
          )}
        </InputContainer>
        {isPending && <Spinner />}
        {/* <Button type='reset' disabled={isPending}>
          Cancel
        </Button> */}
        <Button $variation='primary' disabled={isPending}>
          Sign up
        </Button>
        <p>
          Already a member?
          <StyledLink $variation='secondary' to='/signin'>
            Sign in here
          </StyledLink>
        </p>
      </StyledSignUpForm>
    </>
  );
}

export default SignUpForm;
