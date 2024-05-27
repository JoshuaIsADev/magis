import styled from 'styled-components';
import { Heading, HeadingContainer } from '../ui/Heading';
import StyledLink from '../ui/StyledLink';

const StyledPageNotFound = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 0 var(--padding-body) var(--bottom);
`;

function PageNotFound() {
  return (
    <StyledPageNotFound>
      <HeadingContainer text='Page not found' />
      <Heading as='h3' $variation='danger'>
        Page not found. Please go{' '}
        <StyledLink $variation='secondary' to='/'>
          back to the homepage
        </StyledLink>
      </Heading>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
