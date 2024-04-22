import styled from 'styled-components';
import Row from './Row';
import Column from './Column';

const StyledHr = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-300);
  width: 100%;
  margin: 0;
`;

function Hr() {
  return (
    <Row>
      <Column $variation='hr'>
        <StyledHr />
      </Column>
    </Row>
  );
}

export default Hr;
