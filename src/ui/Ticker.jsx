import styled from 'styled-components';
import Heading from './Heading';

const StyledTicker = styled.div`
  grid-area: ticker;
  padding: var(--cell);
  border-bottom: var(--border);
  border-right: var(--border);
  border-left: var(--border);
`;

function Ticker() {
  return (
    <StyledTicker>
      <Heading as='h3'>Free shipping on all orders!</Heading>
    </StyledTicker>
  );
}

export default Ticker;
