import styled from 'styled-components';
import { VscChromeClose } from 'react-icons/vsc';
import Button from './Button';
import Heading from './Heading';

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: reapeat(2, 1fr);
  grid-template-areas:
    'heading closeButton'
    'form form';
  top: 0;
  /* left: 0; */
  z-index: 20;
  background-color: var(--color-grey-0);
  width: 100%;
  max-width: 120rem;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  border: var(--border);
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const HeadingContainer = styled.div`
  grid-area: heading;
  padding: var(--cell);
  border-bottom: var(--border);
`;

const FormContainer = styled.div`
  grid-area: form;
`;

const CloseButtonContainer = styled.div`
  grid-area: closeButton;
  padding: var(--cell);
  border-bottom: var(--border);
  display: flex;
  justify-content: flex-end;
`;

function Modal({ children, onClose, heading }) {
  return (
    <ModalContainer>
      <StyledModal>
        <HeadingContainer>
          <Heading as='h3'>{heading}</Heading>
        </HeadingContainer>
        <CloseButtonContainer>
          <Button onClick={onClose}>
            <VscChromeClose />
          </Button>
        </CloseButtonContainer>
        <FormContainer>{children}</FormContainer>
      </StyledModal>
      <ModalBg />
    </ModalContainer>
  );
}

export default Modal;
