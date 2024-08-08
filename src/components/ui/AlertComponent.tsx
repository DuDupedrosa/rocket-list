import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { alertTypeEnum } from '../../helpers/enums/alertEnum';
import { CheckCircle, Warning, XCircle } from 'phosphor-react';
import { fadeInLeft } from '../../style/styled-components/Animation';

interface ContentStylesTypes {
  svgColor?: string;
  textColor?: string;
}

interface ContainerStylesTypes {
  bg: string;
  outline?: boolean;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  padding-right: 32px;
  border-radius: 8px;
  background-color: ${({ bg, outline }: ContainerStylesTypes) =>
    outline ? 'transparent' : bg};
  animation: ${fadeInLeft} 0.4s forwards;
  border: ${({ outline, bg }: ContainerStylesTypes) =>
    outline ? `1px solid ${bg}` : 'none'};
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  gap: 16px;
  svg {
    color: ${({ svgColor }: ContentStylesTypes) =>
      svgColor ? svgColor : 'var(--light)'};
    width: 20px;
    height: 20px;
  }

  p {
    font-size: 16px;
    color: ${({ textColor }: ContentStylesTypes) =>
      textColor ? textColor : 'var(--light)'};
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
  outline,
}: {
  type:
    | typeof alertTypeEnum.SUCCESS
    | typeof alertTypeEnum.ERRO
    | typeof alertTypeEnum.INFO
    | typeof alertTypeEnum.WARNING;
  message: string;
  outline?: boolean;
  svgColor?: string;
  textColor?: string;
  onClose?: () => void;
}) {
  const [alertBg, setAlertBg] = useState<string>('');

  function alertBgByType() {
    const literal = {
      [alertTypeEnum.SUCCESS]: '#16a34a',
      [alertTypeEnum.ERRO]: outline ? '#f87171' : '#dc2626',
      [alertTypeEnum.WARNING]: '#ca8a04',
      [alertTypeEnum.INFO]: '#2563eb',
    };

    setAlertBg(literal[type]);
  }

  useEffect(() => {
    alertBgByType();
  }, [type]);

  return (
    <Container bg={alertBg} outline={outline}>
      <Content
        svgColor={outline ? alertBg : undefined}
        textColor={outline ? alertBg : undefined}
      >
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
