import styled from 'styled-components';
import SignUpForm from '../features/authentication/SignUpForm';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';

const StyledSignUp = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: var(--bottom);
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
