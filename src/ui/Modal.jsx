import styled from 'styled-components';

const StyledModal = styled.div`
  top: 0;
  z-index: 20;
  background-color: var(--color-grey-0);
  width: 100%;
  max-width: 80rem;
  height: 100%;
  margin: auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 4rem;
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  padding: 5rem;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

function Modal({ children }) {
  return (
    <ModalContainer>
      <StyledModal>{children}</StyledModal>
      <ModalBg />;
    </ModalContainer>
  );
}

export default Modal;
