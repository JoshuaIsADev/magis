import styled, { css } from 'styled-components';

const variations = {
  footer: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20rem 0 0;
  `,
};

const Section = styled.section`
  max-width: var(--width-max);
  margin: 0 auto;
  padding-top: ${(props) => (props.isFirst ? '6rem' : '0')};
  ${(props) => variations[props.$variation]};
`;

export default Section;
