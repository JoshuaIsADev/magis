import SignInForm from '../features/authentication/SignInForm';
import styled from 'styled-components';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';

const StyledSignIn = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: var(--bottom);
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
