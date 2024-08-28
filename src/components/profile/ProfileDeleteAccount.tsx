import { useEffect, useState } from 'react';
import Button from '../ui/buttons/Button';
import * as style from './style/ProfileDeleteAccount';
import Dialog from '../ui/Dialog';
import { UserLocal } from '../../types/user';
import { toast } from 'sonner';
import http from '../../api/http';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { errorStatusEnum } from '../../helpers/enums/errorStatusEnum';
import AlertComponent from '../ui/AlertComponent';
import { alertTypeEnum } from '../../helpers/enums/alertEnum';

function DeleteAccount() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLocal, setUserLocal] = useState<UserLocal | null>(null);
  const navigate = useNavigate();

  async function deleteAccount() {
    setLoading(true);

    try {
      if (!userLocal) {
        toast.error('Um erro aconteceu, tente novamente mais tarde.');
        return;
      }

      const { data } = await http.delete(`user/${userLocal.id}`);
      setShowDialog(false);
      window.localStorage.clear();
      toast.success('Conta deletada com sucesso!');
      navigate('/auth');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        let status: number;

        if (err.response) {
          status = err.response.status;

          if (status === errorStatusEnum.NOT_FOUND) {
            toast.error('Usuário não encontrada.');
          }
        }
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserLocal(parsedUser);
    }
  }, []);

  return (
    <div>
      <style.ButtonGridContainer>
        <style.ButtonContainer>
          <Button bg="#dc2626" onClick={() => setShowDialog(true)}>
            Deletar conta
          </Button>
        </style.ButtonContainer>
      </style.ButtonGridContainer>

      {showDialog && (
        <Dialog
          isVisible={showDialog}
          loading={loading}
          onClose={() => {
            setShowDialog(false);
          }}
          onAction={async () => {
            await deleteAccount();
          }}
          title="Deletar minha conta"
          buttonEnDialog={{
            buttonActionText: 'Sim, deletar',
            buttonCloseText: 'Não, cancelar',
          }}
        >
          <style.DialogContent>
            <AlertComponent
              size="md"
              type={alertTypeEnum.ERRO}
              message="Atenção: ao deletar sua conta, você perderá permanentemente o acesso e todos os dados associados a ela serão excluídos. Essa ação é irreversível."
            />
          </style.DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default DeleteAccount;
