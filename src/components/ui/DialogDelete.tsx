import styled from 'styled-components';
import Dialog from './Dialog';
import { mediaQueries } from '../../helpers/breakPoints';

const TextConfirmDelete = styled.div`
  div {
    margin-top: 12px;

    p {
      font-size: 16px;
      font-weight: 600;
      color: var(--gray-100);
      text-align: center;
      line-height: 1.5;
    }

    @media ${mediaQueries.md} {
      font-size: 20px;
    }
  }
`;

function DialogDelete({
  text,
  loading,
  onClose,
  onAction,
  isVisible,
}: {
  text: string;
  loading: boolean;
  isVisible: boolean;
  onClose: () => void;
  onAction: () => void;
}) {
  return (
    <Dialog
      isVisible={isVisible}
      loading={loading}
      title="Deletar"
      onClose={() => onClose()}
      onAction={() => onAction()}
      buttonEnDialog={{
        buttonActionText: 'Sim, deletar',
        buttonCloseText: 'Não, cancelar',
      }}
    >
      <TextConfirmDelete>
        <div>
          <p>{text}</p>
        </div>
      </TextConfirmDelete>
    </Dialog>
  );
}

export default DialogDelete;
