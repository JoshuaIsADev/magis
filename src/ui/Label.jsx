import styled from 'styled-components';

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: var(--letter-space);
  text-transform: uppercase;
  /* padding-top: ${(props) => (props.isFirst ? '4rem' : '2rem')}; */
`;

export default Label;
