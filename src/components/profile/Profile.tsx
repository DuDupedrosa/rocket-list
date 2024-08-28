import { useNavigate } from 'react-router-dom';
import { InputForm, Label } from '../../style/styled-components/Form';
import { Button } from '../ui/buttons/ButtonSubmit';
import * as style from './style/ProfileStyle';
import DeleteAccount from './ProfileDeleteAccount';
import http from '../../api/http';
import { useEffect, useState } from 'react';
import { UserLocal } from '../../types/user';
import { SubmitHandler, useForm } from 'react-hook-form';
import RequiredInputMessage from '../form/RequiredInputMessage';
import { validateEmail } from '../../helpers/validator/validEmail';
import AlertComponent from '../ui/AlertComponent';
import { alertTypeEnum } from '../../helpers/enums/alertEnum';
import PageSpinner from '../ui/PageSpinner';
import { AxiosError } from 'axios';
import { errorStatusEnum } from '../../helpers/enums/errorStatusEnum';

type Inputs = {
  email: string;
  name: string;
  lastName: string | null;
};
function Profile() {
  const navigate = useNavigate();
  const [userLocal, setUserLocal] = useState<UserLocal | null>(null);
  const [isValidEmail, setIsEmailValid] = useState<boolean>(true);
  const [showAlertSuccessEdit, setShowAlertSuccessEdit] =
    useState<boolean>(false);
  const [editProfileLoading, setEditProfileLoading] = useState<boolean>(false);
  const [getProfileLoading, setGetProfileLoading] = useState<boolean>(false);
  const [showEditAlertError, setShowEditAlertError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  async function getProfileData() {
    setGetProfileLoading(true);

    try {
      if (!userLocal) return;

      const { data } = await http.get(`/user/${userLocal.id}`);
      const { email, name, lastName, id } = data.content;

      setValue('email', email);
      setValue('name', name);
      setValue('lastName', lastName);
    } catch (err) {}

    setGetProfileLoading(false);
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ email, name, lastName }) => {
    setShowAlertSuccessEdit(false);
    setShowEditAlertError(false);
    setEditProfileLoading(true);

    try {
      if (!userLocal) return;
      if (!isValidEmail || !validateEmail(email)) return;

      let payload: {
        id: string;
        name: string;
        email: string;
        lastName: string | null;
      } = { email, name, lastName, id: userLocal.id };

      const { data } = await http.put(`/user`, payload);

      if (data) {
        setShowAlertSuccessEdit(true);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        let status: number;

        if (err.response) {
          status = err.response.status;

          if (status === errorStatusEnum.BAD_REQUEST) {
            if (err.response.data) {
              const erros = err.response.data.erros;

              if (errors && erros.length > 0) {
                if (erros[0] === '"lastName" is not allowed to be empty') {
                  setShowEditAlertError(true);
                }
              }
            }
          }
        }
      }
    }

    setEditProfileLoading(false);
  };

  function handleBlurEmail(e: React.FocusEvent<HTMLInputElement, Element>) {
    setIsEmailValid(validateEmail(e.target.value));
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isValidEmail) {
      setIsEmailValid(validateEmail(e.target.value));
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);

      setUserLocal(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (userLocal) {
      getProfileData();
    }
  }, [userLocal]);

  return (
    <div>
      <style.Container>
        <style.Title>Editar perfil</style.Title>

        <style.BasicInfoContainer>
          <style.SectionTitle>Informações básicas:</style.SectionTitle>

          {getProfileLoading ? (
            <PageSpinner />
          ) : (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-container">
                  <div>
                    <Label htmlFor="name">Nome *</Label>
                    <InputForm
                      id="name"
                      placeholder="nome"
                      {...register('name', { required: true })}
                    />
                    {errors.name && <RequiredInputMessage />}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <InputForm
                      id="lastName"
                      placeholder="sobrenome"
                      {...register('lastName')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <InputForm
                      id="email"
                      type="email"
                      placeholder="email"
                      {...register('email', {
                        required: true,
                        onChange: (e) => {
                          handleChangeEmail(e);
                        },
                        onBlur: (e) => {
                          handleBlurEmail(e);
                        },
                      })}
                    />
                    {errors.email && <RequiredInputMessage />}
                    {!isValidEmail && (
                      <RequiredInputMessage customMessage="Formato de e-mail inválido" />
                    )}
                  </div>
                </div>

                {showAlertSuccessEdit && (
                  <style.AlertEditContainer>
                    <AlertComponent
                      size="md"
                      type={alertTypeEnum.SUCCESS}
                      message="Suas informações foram salvas com sucesso"
                      onClose={() => setShowAlertSuccessEdit(false)}
                    />
                  </style.AlertEditContainer>
                )}
                {showEditAlertError && (
                  <style.AlertEditContainer>
                    <AlertComponent
                      size="md"
                      type={alertTypeEnum.ERRO}
                      message="O sobrenome já foi salvo anteriormente. Ele não pode ser removido ou deixado em branco. Por favor, insira um sobrenome válido."
                      onClose={() => setShowEditAlertError(false)}
                    />
                  </style.AlertEditContainer>
                )}

                <style.ButtonSubmitContainer>
                  <Button loading={editProfileLoading}>Editar</Button>
                </style.ButtonSubmitContainer>
              </form>
            </div>
          )}
        </style.BasicInfoContainer>

        <style.Divider />

        <div>
          <style.SectionTitle>Alterar senha:</style.SectionTitle>
          <style.ChangePasswordWarningText>
            <p>
              Se você deseja alterar sua senha, clique no link abaixo para ser
              redirecionado à página de troca de senha:{' '}
              <span onClick={() => navigate('/changePassword')}>
                Alterar senha
              </span>
            </p>
          </style.ChangePasswordWarningText>
        </div>

        <style.Divider />
      </style.Container>

      <DeleteAccount />
    </div>
  );
}

export default Profile;
