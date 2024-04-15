import styled from 'styled-components';
import Heading from '../ui/Heading';

const StyledSpreadText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98vw;
  max-width: var(--width-max);
  margin: 0 auto;
  padding-right: 2rem;
  /* padding: 0 var(--padding-s); */
`;
export function spreadText(text) {
  return (
    <StyledSpreadText>
      {text.split('').map((letter, index) => (
        <div key={index}>
          <Heading as='h1' $variation='hero'>
            {letter}
          </Heading>
        </div>
      ))}
    </StyledSpreadText>
  );
}
