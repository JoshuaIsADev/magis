import { useForm } from 'react-hook-form';
import StyledLink from '../../ui/StyledLink';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Errors from '../../ui/Errors';
import { useSignUp } from './useSignUp';
import Button from '../../ui/Button';
import styled from 'styled-components';

const StyledSignUpForm = styled.form`
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
        {isPending && <Spinner />}
        {/* <Button type='reset' disabled={isPending}>
          Cancel
        </Button> */}
        <Button $variation='primary' disabled={isPending}>
          Sign up
        </Button>
      </StyledSignUpForm>
      <Container>
        <p>
          Already a member?
          <StyledLink $variation='primaryHeading' to='/signin'>
            Sign In
          </StyledLink>
        </p>
      </Container>
    </>
  );
}

export default SignUpForm;
