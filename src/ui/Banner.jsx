import styled, { keyframes } from 'styled-components';
import Heading from './Heading';

const BannerAnimation = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  3% {
    transform: translateX(0);
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100%{
    transform: translateX(-280rem);
    opacity: 0;
  }
`;

const StyledBanner = styled.div`
  grid-area: banner;
  padding: var(--cell);
  border-right: var(--border);
  border-left: var(--border);
  border-bottom: var(--border);
`;

const TextContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  opacity: 0;
  animation: ${BannerAnimation} 40s linear forwards;
  animation-iteration-count: infinite;
`;

function Banner({ text, size }) {
  return (
    <StyledBanner>
      <TextContainer>
        <Heading as={size}>{text}</Heading>
      </TextContainer>
    </StyledBanner>
  );
}

export default Banner;
