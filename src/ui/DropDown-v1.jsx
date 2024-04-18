import styled from 'styled-components';

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const RadioContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border: 1px solid var(--color-grey-300);
  border-radius: 50%;
  ${RadioContainer}:hover & {
    background-color: var(--color-grey-900);
  }

  ${Input}:checked + & {
    background-color: var(--color-grey-900);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  z-index: 20;
`;

const DropdownButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 0.5rem;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropdownContent = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-0);
  width: 100%;
  min-width: 20rem;
  padding: 2rem 0;
  gap: 2rem;
  z-index: 20;

  ${DropdownContainer} &,
  &.show {
    display: flex;
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

export {
  Input,
  RadioContainer,
  Checkmark,
  ButtonContainer,
  DropdownButton,
  DropdownContainer,
  DropdownContent,
};
