import styled, { css, keyframes } from 'styled-components';

const variations = {
  header: css`
    display: flex;
    align-items: center;
    padding-top: 10rem;
    background-color: white;
  `,
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

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DropdownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(1rem);
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  gap: 0.5rem;
  z-index: -1;

  &.show {
    position: relative;
    display: flex;
    opacity: 1;
    animation: ${DropdownAnimation} 0.2s ease-in-out forwards;
    z-index: 2;
  }

  p {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    &:hover,
    &:active,
    &:enabled {
      color: var(--color-grey-200);
    }
  }
`;

const DropdownRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  ${(props) => variations[props.$variation]}
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.5rem;
`;

const Button = styled.button`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: var(--letter-space);
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-0);
  border: none;
  cursor: pointer;
  &:hover,
  &.selected {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    text-decoration-thickness: 2px;
  }
  ${(props) => variations[props.$variation]}
`;

export { DropdownRow, Column, Button, DropdownContainer, DropdownContent };
