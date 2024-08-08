import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { alertTypeEnum } from '../../helpers/enums/alertEnum';
import { CheckCircle, Warning, XCircle } from 'phosphor-react';
import { fadeInLeft } from '../../style/styled-components/Animation';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  padding-right: 32px;
  border-radius: 8px;
  background-color: ${({ bg }: { bg: string }) => bg};
  animation: ${fadeInLeft} 0.4s forwards;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  gap: 16px;

  svg {
    color: var(--light);
    width: 20px;
    height: 20px;
  }

  p {
    font-size: 16px;
    color: var(--light);
    font-weight: normal;
    line-height: 1.5;
  }
`;

const XCloseAlertContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  svg {
    width: 24px;
    cursor: pointer;
    height: 24px;
    color: var(--light);
    transition: all;
  }
`;

function AlertComponent({
  type,
  message,
  onClose,
}: {
  type:
    | typeof alertTypeEnum.SUCCESS
    | typeof alertTypeEnum.ERRO
    | typeof alertTypeEnum.INFO
    | typeof alertTypeEnum.WARNING;
  message: string;
  onClose?: () => void;
}) {
  const [alertBg, setAlertBg] = useState<string>('');

  function alertBgByType() {
    const literal = {
      [alertTypeEnum.SUCCESS]: '#16a34a',
      [alertTypeEnum.ERRO]: '#dc2626',
      [alertTypeEnum.WARNING]: '#ca8a04',
      [alertTypeEnum.INFO]: '#2563eb',
    };

    setAlertBg(literal[type]);
  }

  useEffect(() => {
    alertBgByType();
  }, [type]);

  return (
    <Container bg={alertBg}>
      <Content>
        {type === alertTypeEnum.ERRO && <Warning size={20} />}
        {type === alertTypeEnum.SUCCESS && <CheckCircle size={20} />}
        {type === alertTypeEnum.INFO && <CheckCircle size={20} />}
        {type === alertTypeEnum.WARNING && <Warning size={20} />}

        <p>{message}</p>
      </Content>

      {onClose && (
        <XCloseAlertContainer onClick={() => onClose()}>
          <XCircle size={24} />
        </XCloseAlertContainer>
      )}
    </Container>
  );
}

export default AlertComponent;
