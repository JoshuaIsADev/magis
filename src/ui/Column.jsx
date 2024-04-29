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
    grid-column: 4 / span 1;
    justify-content: right;
  `,
  heroHeadline: css`
    grid-column: 1 / span 2;
  `,
  heroImage: css`
    grid-column: 3 / span 2;
  `,
  sectionHeading: css`
    grid-column: 1 / span 4;
  `,
  filterSortButton: css`
    grid-column: 1 / span 4;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    z-index: 2;
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
    z-index: -1;
    background-color: var(--color-grey-0);
    &.applyButton {
      grid-column: span 4;
      position: relative;
      display: flex;
      opacity: 1;
      animation: ${DropdownAnimation} 0s ease-in-out forwards;
      z-index: 2;
      background-color: var(--color-grey-0);
    }
    &.show {
      position: relative;
      display: flex;
      opacity: 1;
      animation: ${DropdownAnimation} 0s ease-in-out forwards;
      z-index: 2;
      background-color: var(--color-grey-0);
    }
  `,
  productCard: css`
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 2fr;
    flex-direction: row;
    justify-content: space-between;
    gap: 8rem;
  `,
  productCardManage: css`
    grid-column: span 1;
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
  footerSiteInfo: css`
    grid-column: 3 / span 2;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
  `,
  signInUpForm: css`
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  formSubmitButtons: css`
    grid-column: 1 / span 2;
    display: flex;
    gap: 2rem;
  `,
  createEditProduct: css`
    grid-column: 1 / span 6;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  cart: css`
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    /* border-bottom: 1px solid var(--color-grey-200);
    &:last-child {
      border-bottom: none;
    } */
  `,
  order: css`
    grid-column: 3 / span 2;
    display: flex;
    flex-direction: column;
  `,
  orderInfo: css`
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  orderButtons: css`
    grid-column: span 1;
    display: flex;
    flex-direction: row;
    gap: 2rem;
  `,
  buttons: css`
    grid-column: span 1;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding-top: 4rem;
  `,
  orderSummary: css`
    grid-column: span 2;
    display: flex;
    flex-direction: column;
  `,
  checkout: css`
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  checkoutOrderSummary: css`
    grid-column: 5 / span 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  empty: css`
    grid-column: span 2;
  `,
};

const Column = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  background-color: var(--color-grey-0);
  ${(props) => variations[props.$variation]}
  padding-bottom: ${(props) => (props.isLast ? '40vh' : '2rem')};
`;

export default Column;
