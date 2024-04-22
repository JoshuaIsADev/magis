import styled from 'styled-components';
import Label from './Label';

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red);
`;

function FormRow({ label, error, children }) {
  return (
    <>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </>
  );
}

export default FormRow;
