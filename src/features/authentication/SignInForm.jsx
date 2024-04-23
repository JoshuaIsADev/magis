import { useState } from 'react';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import { useSignIn } from './useSignIn';
import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Column from '../../ui/Column';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';

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
    <form onSubmit={handleSubmit}>
      <Row>
        <Column $variation='signInUpForm'>
          <Heading as='h3' $variation='footer'>
            Not yet a member? Sign up!
          </Heading>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          ></Input>

          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            autoComplete='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          ></Input>

          {isPending && <Spinner />}
          <Button disabled={isPending}>Sign in</Button>
        </Column>
      </Row>
    </form>
  );
}

export default SignInForm;
