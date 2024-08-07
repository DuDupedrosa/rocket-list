import styled from 'styled-components';
import { mediaQueries } from '../../../helpers/breakPoints';

export const Container = styled.div`
  background-color: var(--gray-700);
  min-height: 100vh;
  width: 100vw;
`;

export const MainGridContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100vw;
  min-height: 100vh;

  @media ${mediaQueries.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const LeftScreen = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${mediaQueries.lg} {
    display: initial;
  }
`;

export const RightScreen = styled.div`
  background-color: var(--mainBlue);
  height: 100%;
  display: none;

  @media ${mediaQueries.lg} {
    display: block;
  }
`;

export const CardFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: initial;
  padding-left: 32px;
  padding-right: 32px;

  @media ${mediaQueries.lg} {
    height: 100%;
  }

  @media ${mediaQueries.sm} {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const CardFormBg = styled.div`
  background-color: var(--gray-500);
  padding: 20px;
  border-radius: 8px;
  width: 100%;

  @media ${mediaQueries.sm} {
    width: 70%;
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: var(--gray-300);
  margin-bottom: 8px;

  @media ${mediaQueries.md} {
    font-size: 24px;
  }
`;

export const WelcomeText = styled.p`
  font-size: 14px;
  font-weight: normal;
  color: var(--gray-300);
  margin-bottom: 32px;

  @media ${mediaQueries.md} {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  font-family: var(--family-text);
  font-size: 1rem;
  color: var(--gray-300);
  background-color: var(--gray-600);
  border: none;
  border-radius: 8px;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  height: 44px;
  transition: 0.3s;

  :focus {
    outline: none;
  }

  :hover,
  :focus {
    box-shadow: 0 0 0 2px var(--gray-300);
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--gray-300);
  margin-left: 4px;
  display: flex;
`;

export const FormInputsGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormTaskButtonSubmit = styled.button`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.4;
  color: #f2f2f2;
  background-color: var(--mainBlue);
  border-radius: 8px;
  height: 44px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  justify-content: center;

  :hover,
  :focus {
    box-shadow: 0 0 0 2px var(--mainBlue);
    outline: none;
  }
`;

export const WelcomeRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 42px;
  height: 100%;
`;

export const WelcomeRightSectionTitle = styled.h2`
  color: var(--light);
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: 32px;
`;

export const WelcomeRightSectionText = styled.p`
  color: var(--light);
  font-size: 15px;
`;

export const MobileLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;

  @media ${mediaQueries.lg} {
    display: none;
  }
`;

export const EndFormLinkContainer = styled.div`
  p {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    display: flex;
    align-items: center;
    color: var(--gray-300);
    justify-content: center;
    margin-top: 20px;

    span {
      cursor: pointer;
      color: var(--mainBlue);
      display: block;
      margin-left: 8px;
      transition: 0.3s;
      padding-top: 2px;
      padding-bottom: 2px;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;
