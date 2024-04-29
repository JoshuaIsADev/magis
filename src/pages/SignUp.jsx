import styled from 'styled-components';
import SignUpForm from '../features/authentication/SignUpForm';
import Heading from '../ui/Heading';

const StyledSignUp = styled.section`
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

const HeadingContainer = styled.div`
  grid-area: heading;
  padding: var(--cell);
  border-bottom: var(--border);
  border-left: var(--border);
`;

function SignUp() {
  return (
    <StyledSignUp>
      <HeadingContainer>
        <Heading as='h3'>Sign up</Heading>
      </HeadingContainer>
      <SignUpForm />
    </StyledSignUp>
  );
}

export default SignUp;
