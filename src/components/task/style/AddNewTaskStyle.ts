import styled from 'styled-components';
import { fadeInLeft } from '../../../style/styled-components/Animation';

export const AddNewTaskContainer = styled.div`
  padding: 0 20px;
  width: 100%;
`;

export const FormTask = styled.form`
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
  max-width: 700px;
  margin-top: -30px !important;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 64px;
  position: relative;
`;

export const FormTaskInputText = styled.input`
  font-family: var(--family-text);
  font-size: 1rem;
  line-height: 1.4;
  color: var(--gray-300);
  background-color: var(--gray-500);
  border: 1px solid
    ${({ border }: { border?: boolean }) =>
      border ? 'var(--gray-700)' : 'transparent'};
  border-radius: 8px;
  width: 100%;
  padding: 16px;
  transition: 0.3s;

  :focus {
    outline: none;
  }

  :hover,
  :focus {
    box-shadow: 0 0 0 4px var(--gray-500);
  }
`;

export const FormTaskButtonSubmit = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #f2f2f2;
  background-color: #1e6f9f;
  border-radius: 8px;
  padding: 16px;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  :hover,
  :focus {
    box-shadow: 0 0 0 4px #1e6f9f;
    outline: none;
  }

  :disabled {
    opacity: 0.8;
    cursor: ${({ loading }: { loading?: boolean }) =>
      loading ? 'wait' : 'not-allowed'};

    :hover {
      box-shadow: none;
    }
  }
`;

export const BorderIconAdd = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonCleanTasks = styled.button`
  display: block;
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #f2f2f2;
  background-color: #1e6f9f;
  border-radius: 8px;
  padding: 16px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  width: 120px;
  position: absolute;
  right: 0;

  :hover,
  :focus {
    box-shadow: 0 0 0 4px #1e6f9f;
    outline: none;
  }
`;

export const AlertLimitTask = styled.p`
  font-size: 12px;
  font-family: var(--family-text);
  line-height: 1.5;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.015rem;
  background-color: #1e6f9f;
  max-width: max-content;
  padding: 0.2rem;
  border-radius: 4px;
  position: absolute;
  z-index: 9999;
  top: -40px;
  animation: ${fadeInLeft} 0.4s forwards;
`;

export const TasksCardsContainer = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

export const NotHaveTaskBox = styled.div`
  margin-top: 40px;
  max-width: 100%;
  border-top: 1px solid #333333;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  place-items: center;
  margin-bottom: 32px;
`;

interface TextBold {
  isBold: boolean;
}

export const NotHaveTaskContent = styled.div`
  margin-top: 1rem;

  p + p {
    margin-top: 0.4rem;
  }
`;

export const NotHaveTaskImgBox = styled.div`
  margin-top: 40px;
`;

export const NotHaveTaskText = styled.p`
  font-family: var(--family-text);
  font-size: 1rem;
  line-height: 1.4;
  text-align: center;
  color: #808080;
  font-weight: ${(p: TextBold) => (p.isBold ? '700' : '400')};
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--gray-300);
  margin-left: 4px;
  display: flex;
`;
