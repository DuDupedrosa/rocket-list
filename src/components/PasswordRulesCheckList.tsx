import styled from 'styled-components';
import { passwordCheckListData } from '../helpers/data/passwordCheckListData';

const PasswordRulesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;

    div {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: var(--gray-300);
    }

    span {
      display: block;
      color: var(--gray-300);
      font-size: 12px;
      font-weight: normal;
    }
  }
`;

function PasswordRulesCheckList() {
  return (
    <PasswordRulesList>
      {passwordCheckListData.map((rule: string, i: number) => {
        return (
          <li key={i}>
            <div />
            <span>{rule}</span>
          </li>
        );
      })}
    </PasswordRulesList>
  );
}

export default PasswordRulesCheckList;
