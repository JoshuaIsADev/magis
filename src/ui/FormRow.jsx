import styled from 'styled-components';
import Label from './Label';

const StyledFormRow = styled.div`
  display: grid;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
