import styled from 'styled-components';
import Heading from './Heading';
import Hr from './Hr';
import Row from './Row';
import Column from './Column';

const StyledSectionHeading = styled.div`
  grid-column: span 2;
  padding: var(--cell);
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
`;

function SectionHeading({ text }) {
  return (
    <StyledSectionHeading>
      <Heading as='h3'>{text}</Heading>
    </StyledSectionHeading>
  );
}

export default SectionHeading;
