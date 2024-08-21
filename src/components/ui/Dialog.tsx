import { X, XCircle } from 'phosphor-react';
import styled from 'styled-components';
import LoadingSpinner from './loadingSpinner';
import { mediaQueries } from '../../helpers/breakPoints';
import { useEffect } from 'react';

const DialogContainer = styled.div`
  width: 100%;
  min-height: 100dvh;
  position: absolute;
  top: 0;
  display: grid;
  background-color: rgba(0, 0, 0, 0.5);
  place-items: center;
`;

const DialogCard = styled.div`
  padding: 24px;
  margin-left: 20px;
  margin-right: 20px;
  min-width: 320px;
  min-height: 320px;
  background-color: var(--gray-600);
  border: 1px solid var(--gray-300);
  border-radius: 12px;
  position: absolute;
  z-index: 9999999999px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-20px);
  animation: slideIn 0.3s ease-in-out forwards;

  @media ${mediaQueries.md} {
    min-width: 520px;
  }

  @media ${mediaQueries.sm} {
    min-width: 384px;
  }

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid var(--gray-300);
  padding-bottom: 20px;
  margin-bottom: 32px;

  h4 {
    font-size: 20px;
    font-weight: 600;
    color: var(--gray-100);

    @media ${mediaQueries.md} {
      font-size: 24px;
    }
  }

  svg {
    width: 28px;
    height: 28px;
    color: var(--red-600);
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

interface ButtonActionProps {
  outline?: boolean;
  loading?: boolean;
}
const ButtonActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

const ButtonAction = styled.button`
  border-radius: 8px;
  height: 38px;
  color: var(--gray-100);
  font-size: 16px;
  font-weight: normal;
  background-color: ${({ outline }: ButtonActionProps) =>
    outline ? 'transparent' : 'var(--mainBlue)'};
  border: 1px solid
    ${({ outline }: ButtonActionProps) =>
      outline ? 'var(--mainBlue)' : 'transparent'};
  padding-right: 12px;
  padding-left: 12px;
  cursor: pointer;
  transition: 0.3s;
  min-width: 90px;

  :hover {
    box-shadow: ${({ outline }: ButtonActionProps) =>
      outline ? 'none' : '0 0 0 2px var(--mainBlue)'};
    background-color: var(--mainBlue);
  }

  :disabled {
    opacity: 0.6;
    cursor: ${({ loading }: ButtonActionProps) =>
      loading ? 'wait' : 'not-allowed'};

    :hover {
      box-shadow: none;
      background-color: ${({ outline }: ButtonActionProps) =>
        outline ? 'transparent' : 'var(--mainBlue)'};
    }
  }

  @media ${mediaQueries.md} {
    font-size: 16px;
    height: 44px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChildrenContainer = styled.div`
  flex: 1;
`;

function Dialog({
  title,
  children,
  loading,
  buttonEnDialog,
  isVisible,
  onClose,
  onAction,
}: {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  onAction?: () => void;
  buttonEnDialog?: {
    buttonCloseText: string;
    buttonActionText: string;
  };
  loading?: boolean;
}) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <DialogContainer>
      <DialogCard>
        {/* header com titulo + close buttons */}
        <Header>
          <h4>{title}</h4>
          <XCircle
            size={28}
            onClick={() => {
              if (onClose && !loading) onClose();
            }}
          />
        </Header>

        <ContentContainer>
          {/* filhos */}
          <ChildrenContainer>{children}</ChildrenContainer>

          {/* botões caso queria um footer pronto */}
          {buttonEnDialog && (
            <ButtonActionContainer>
              <ButtonAction
                disabled={loading}
                onClick={() => {
                  if (onClose) onClose();
                }}
                loading={loading}
                outline={true}
              >
                {buttonEnDialog.buttonCloseText}
              </ButtonAction>
              <ButtonAction
                onClick={() => {
                  if (onAction) onAction();
                }}
                loading={loading}
                disabled={loading}
              >
                {loading && <LoadingSpinner size="sm" />}
                {!loading && buttonEnDialog.buttonActionText}
              </ButtonAction>
            </ButtonActionContainer>
          )}
        </ContentContainer>
      </DialogCard>
    </DialogContainer>
  );
}

export default Dialog;
