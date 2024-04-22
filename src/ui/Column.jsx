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
  headerNav: css`
    grid-column: 5 / span 2;
    justify-content: right;
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
    gap: 0.35rem;
    opacity: 0;
    &.show {
      position: relative;
      display: flex;
      opacity: 1;
      animation: ${DropdownAnimation} 0.2s ease-in-out forwards;
      z-index: 2;
      padding-bottom: 4rem;
    }
  `,
};

const Column = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  ${(props) => variations[props.$variation]}
`;

export default Column;
