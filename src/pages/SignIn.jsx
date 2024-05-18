import SignInForm from '../features/authentication/SignInForm';
import styled from 'styled-components';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';

const StyledSignIn = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    ' heading heading heading heading'
    '. form container .';
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
  padding-top: var(--top);
`;

const HeadingContainer2 = styled.div`
  grid-area: heading;
  padding: var(--cell);
  border-bottom: var(--border);
  border-left: var(--border);
`;

function SignIn() {
  return (
    <StyledSignIn>
      <HeadingContainer2>
        <Heading as='h3'>Sign in</Heading>
      </HeadingContainer2>
      <SignInForm />
    </StyledSignIn>
  );
}

export default SignIn;
