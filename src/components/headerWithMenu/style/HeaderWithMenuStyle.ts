import styled from 'styled-components';
import { fadeIn, fadeInDown } from '../../../style/styled-components/Animation';

export const Container = styled.div`
  background-color: var(--gray-700);
  border-bottom: 2px solid var(--gray-500);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonMenuContainer = styled.div`
  position: relative;

  button {
    width: 80px;
    height: 42px;
    border-radius: 8px;
    background-color: var(--mainBlue);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    border: 2px solid transparent;
    transition: 0.3s;

    svg {
      color: var(--gray-100);
      width: 32px;
      height: 32px;
      transition: 0.6s;
    }

    :hover {
      border-color: var(--gray-100);
    }
  }

  ul {
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 8px;
    background-color: var(--gray-500);
    min-width: 160px;
    padding-left: 12px;
    padding-right: 12px;
    position: absolute;
    left: -80px;
    top: 50px;

    display: grid;
    gap: 12px;

    opacity: 0; /* Inicialmente invisível */
    animation: ${fadeInDown} 0.3s ease forwards; /* Animação de entrada */

    li {
      button {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 8px;
        cursor: pointer;
        background-color: transparent;
        width: 100%;
        border: none;
        text-align: start;
        padding: 8px;
        border-radius: 4px;
        transition: 0.3s;

        svg {
          color: var(--gray-100);
          width: 24px;
          height: 24px;
        }

        :hover {
          background-color: var(--gray-300);
        }

        span {
          color: var(--gray-100);
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
`;

export const IconWrapper = styled.div<{ isVisible: boolean }>`
  animation: ${fadeIn} 0.3s ease forwards;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export const LogoContainer = styled.div`
  span {
    display: block;
    cursor: pointer;
  }
`;
