import styled from 'styled-components';
import Dialog from './Dialog';

const TextConfirmDelete = styled.div`
  div {
    margin-top: 12px;

    p {
      font-size: 20px;
      font-weight: 600;
      color: var(--gray-100);
      text-align: center;
    }
  }
`;

function DialogDelete({
  text,
  loading,
  onClose,
  onAction,
}: {
  text: string;
  loading: boolean;
  onClose: () => void;
  onAction: () => void;
}) {
  return (
    <Dialog
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
