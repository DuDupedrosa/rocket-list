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
