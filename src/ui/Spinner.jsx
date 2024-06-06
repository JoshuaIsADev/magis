import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to{
    transform: rotate(1turn)
  }
`;

const SpinnerSVG = styled.svg`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 1s infinite linear;
`;

const Spinner = () => (
  <SpinnerSVG
    viewBox='0 0 60 60'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='30' cy='5' r='5' fill='black' />
    <circle cx='30' cy='55' r='5' fill='black' />
    <circle cx='55' cy='30' r='5' fill='black' />
    <circle cx='5' cy='30' r='5' fill='black' />
    <circle
      cx='47.6777'
      cy='12.3211'
      r='5'
      transform='rotate(45 47.6777 12.3211)'
      fill='black'
    />
    <circle
      cx='12.3223'
      cy='47.6804'
      r='5'
      transform='rotate(45 12.3223 47.6804)'
      fill='black'
    />
    <circle
      cx='47.6777'
      cy='47.6804'
      r='5'
      transform='rotate(45 47.6777 47.6804)'
      fill='black'
    />
    <circle
      cx='12.3223'
      cy='12.3211'
      r='5'
      transform='rotate(45 12.3223 12.3211)'
      fill='black'
    />
  </SpinnerSVG>
);

export default Spinner;
