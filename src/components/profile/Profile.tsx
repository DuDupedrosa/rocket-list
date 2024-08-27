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

type Inputs = {
  email: string;
  name: string;
  lastName: string | null;
};
function Profile() {
  const navigate = useNavigate();
  const [userLocal, setUserLocal] = useState<UserLocal | null>(null);
  const [isValidEmail, setIsEmailValid] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  async function getProfileData() {
    try {
      if (!userLocal) return;

      const { data } = await http.get(`/user/${userLocal.id}`);
      const { email, name, lastName, id } = data.content;

      setValue('email', email);
      setValue('name', name);
      setValue('lastName', lastName);
    } catch (err) {}
  }

  const onSubmit: SubmitHandler<Inputs> = async (payload) => {
    if (!isValidEmail || !validateEmail(payload.email)) return;
    console.log(payload);
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
    <style.Container>
      <style.Title>Editar perfil</style.Title>

      <style.BasicInfoContainer>
        <style.SectionTitle>Informações básicas:</style.SectionTitle>

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
            <style.ButtonSubmitContainer>
              <Button>Editar</Button>
            </style.ButtonSubmitContainer>
          </form>
        </div>
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

      <DeleteAccount />
    </style.Container>
  );
}

export default Profile;
