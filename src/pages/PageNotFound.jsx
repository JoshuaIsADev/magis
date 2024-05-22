import styled from 'styled-components';
import { Heading, HeadingContainer } from '../ui/Heading';
import StyledLink from '../ui/StyledLink';

const StyledPageNotFound = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--grid-gap);
  width: 100%;
  margin-bottom: var(--bottom);
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
