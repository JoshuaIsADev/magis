import styled, { css } from 'styled-components';

const variations = {
  guest: css`
    display: flex;
    flex-direction: column;
    max-width: 40rem;
    max-height: 40rem;
    aspect-ratio: 1/1;
    padding: 2rem;
    background-color: var(--color-grey-900);
    border-radius: 30rem;
    align-items: left;
    justify-content: center;
    gap: 1rem;
  `,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  max-height: 40rem;
  aspect-ratio: 1/1;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  ${(props) => variations[props.$variation]}
`;

export default Form;
