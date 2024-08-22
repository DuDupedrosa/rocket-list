import { keyframes } from 'styled-components';

export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-40px,0,0);
  }

  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

export const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
