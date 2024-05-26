import SignInForm from '../features/authentication/SignInForm';
import styled from 'styled-components';
import { HeadingContainer } from '../ui/Heading.jsx';

const StyledSignIn = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body) var(--bottom);
`;

function SignIn() {
  return (
    <StyledSignIn>
      <HeadingContainer text='Sign in' />
      <SignInForm />
    </StyledSignIn>
  );
}

export default SignIn;
