import { useState } from 'react';
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
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          autoComplete='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        ></Input>
      </FormRow>
      <FormRow>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          id='password'
          autoComplete='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        ></Input>
      </FormRow>
      <FormRow>
        {isPending && <Spinner />}
        <button disabled={isPending}>Sign in</button>
      </FormRow>
    </Form>
  );
}

export default SignInForm;
