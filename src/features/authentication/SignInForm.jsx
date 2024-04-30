import { useState } from 'react';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import { useSignIn } from './useSignIn';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import StyledLink from '../../ui/StyledLink';
import styled from 'styled-components';

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
`;

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isPending } = useSignIn();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    signIn(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <>
      <StyledSignInForm onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            autoComplete='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          ></Input>
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
