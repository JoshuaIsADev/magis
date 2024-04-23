import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import StyledLink from '../../ui/StyledLink';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import { useSignIn } from './useSignIn';
import Spinner from '../../ui/Spinner';
import Errors from '../../ui/Errors';
import { useSignUp } from './useSignUp';
import Row from '../../ui/Row';
import Column from '../../ui/Column';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Column $variation='signInUpForm'>
          <Heading as='h3' $variation='footer'>
            Already a member?
            <StyledLink $variation='primaryHeading' to='/signin'>
              Sign In
            </StyledLink>
          </Heading>
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
          <Button type='reset' disabled={isPending}>
            Cancel
          </Button>
          <Button $variation='primary' disabled={isPending}>
            {'Sign up'}
          </Button>
        </Column>
      </Row>
    </form>
  );
}

export default SignUpForm;
