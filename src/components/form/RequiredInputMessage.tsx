import { Warning } from 'phosphor-react';
import styled, { keyframes } from 'styled-components';

const AnimeLeft = keyframes`
   from {
    opacity: 0;
    transform: translate3d(-30px,0,0);
  }

  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;
const Message = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: normal;
  color: var(--red-400);
  transition: 0.4s;
  animation: ${AnimeLeft} 0.6s forwards;
`;

function RequiredInputMessage({ customMessage }: { customMessage?: string }) {
  return (
    <Message>
      <Warning size={18} />
      {customMessage ? customMessage : 'Esse campo é obrigatório'}
    </Message>
  );
}

export default RequiredInputMessage;
