import styled from 'styled-components';
import SignUpForm from '../features/authentication/SignUpForm';
import { HeadingContainer } from '../ui/Heading.jsx';

const StyledSignUp = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body) var(--bottom);
`;

function SignUp() {
  return (
    <StyledSignUp>
      <HeadingContainer text='Sign up' />
      <SignUpForm />
    </StyledSignUp>
  );
}

export default SignUp;
