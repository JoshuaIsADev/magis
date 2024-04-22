import styled, { css } from 'styled-components';

const variations = {
  guest: css`
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-grey-0);
  `,
};

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  ${(props) => variations[props.$variation]}
`;

export default Label;
