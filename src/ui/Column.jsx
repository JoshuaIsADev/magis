import styled, { css, keyframes } from 'styled-components';

const DropdownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const variations = {
  hr: css`
    grid-column: 1 / span 6;
  `,
  header: css`
    flex-direction: row;
  `,
  headerLogo: css`
    grid-column: 1 / span 1;
  `,
  headerNavShop: css`
    grid-column: 5 / span 1;
    justify-content: left;
  `,
  headerNavUser: css`
    grid-column: 6 / span 1;
    justify-content: left;
  `,
  heroHeadline: css`
    grid-column: 1 / span 6;
  `,
  sectionHeading: css`
    grid-column: 1 / span 6;
  `,
  filterSortButton: css`
    grid-column: 1 / span 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  `,
  filterSortColumn: css`
    grid-column: span 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 0.5rem;
    opacity: 0;
    position: absolute;
    transform: translateY(1rem);
    &.show {
      position: relative;
      display: flex;
      opacity: 1;
      animation: ${DropdownAnimation} 0.2s ease-in-out forwards;
      z-index: 2;
      padding-bottom: 4rem;
    }
  `,
  productCard: css`
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    padding-top: 10rem;
  `,
  footerAbout: css`
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    text-align: justify;
    gap: 2rem;
  `,
  footerContact: css`
    grid-column: 5 / span 2;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  signInUpForm: css`
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
};

const Column = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  ${(props) => variations[props.$variation]}
`;

export default Column;
