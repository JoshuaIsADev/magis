import styled, { css } from 'styled-components';

const variations = {
  hero: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100vh;
    background-image: url('https://wuurkebuthemtrftoedw.supabase.co/storage/v1/object/public/product-images/Magis_hero.jpg?t=2024-04-14T20%3A00%3A25.629Z');
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    padding-bottom: var(--padding-m);
  `,
};

const Section = styled.section`
  padding: 0 var(--padding-s);
  max-width: var(--width-max);
  margin: 0 auto;
  ${(props) => variations[props.$variation]}
`;

export default Section;
