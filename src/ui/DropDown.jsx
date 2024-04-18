import styled, { css } from 'styled-components';

const variations = {
  menu: css`
    display: flex;
    align-items: center;
    border: none;
    &:hover,
    &.selected {
      background-color: var(--color-grey-0);
      color: var(--color-grey-900);
    }
  `,
};

const DropdownRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  ${(props) => variations[props.$variation]}
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 6rem;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover,
  &.selected {
    background-color: var(--color-grey-900);
    color: var(--color-grey-0);
  }
  ${(props) => variations[props.$variation]}
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DropdownContent = styled.div`
  position: absolute;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  background-color: rgba(255, 255, 255, 0.9);
  /* background-image: linear-gradient(
    to bottom,
    var(--color-grey-0) 60%,
    rgba(255, 0, 0, 0)
  ); */
  /* padding-bottom: 1rem; */
  width: 100%;
  gap: 0.5rem;
  z-index: -1;
  transform: translateY(4rem);
  transition: all 0.2s ease-in-out;
  &.show {
    position: absolute;
    opacity: 1;
    display: flex;
    z-index: 2;
    transform: translateY(5rem);
    transition: all 0.2s ease-in-out;
  }

  p {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    &:hover,
    &:active,
    &:enabled {
      color: var(--color-grey-200);
    }
  }
`;

export { DropdownRow, Column, Button, DropdownContainer, DropdownContent };
