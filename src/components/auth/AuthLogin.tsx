import React, { useState } from 'react';
import * as styled from './style/AuthLoginStyle';
import * as styledAuth from './style/AuthStyle';
import RequiredInputMessage from '../form/RequiredInputMessage';
import LogoBlack from '../../assets/logo-black.svg';
import Logo from '../../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';
import AlertComponent from '../ui/AlertComponent';
import { alertTypeEnum } from '../../helpers/enums/alertEnum';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import http from '../../api/http';
import { AxiosError } from 'axios';
import { errorStatusEnum } from '../../helpers/enums/errorStatusEnum';
import { alertDataType } from '../../types/alert';
import { Eye, EyeSlash } from 'phosphor-react';
import LoadingSpinner from '../ui/loadingSpinner';
import ButtonSubmit from '../ui/buttons/ButtonSubmit';

type Inputs = {
  email: string;
  password: string;
};

function AuthLogin() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<alertDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (payload) => {
    setLoading(true);
    setAlert(null);

    try {
      const { data } = await http.post('auth/signin', { ...payload });
      const { user, token } = data.content;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      navigate('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        let status: number;

        if (err.response) {
          status = err.response.status;

          if (
            status === errorStatusEnum.BAD_REQUEST &&
            err.response.data.message === 'Validation failed'
          ) {
            setAlert({
              show: true,
              message: 'Formato de e-mail inválido.',
            });
          }

          if (status === errorStatusEnum.NOT_FOUND) {
            setAlert({
              show: true,
              message: 'E-mail ou senha incorretos.',
            });
          }
        }
      }
    }

    setLoading(false);
  };

  return (
    <styledAuth.Container>
      <styledAuth.MainGridContent>
        {/* coluna do form */}
        <styledAuth.LeftScreen>
          <styledAuth.MobileLogoContainer>
            <img src={Logo} alt="ToDo" />
          </styledAuth.MobileLogoContainer>
          <styledAuth.CardFormContainer>
            <styledAuth.CardFormBg>
              <styledAuth.WelcomeTitle>Bem vindo</styledAuth.WelcomeTitle>
              <styledAuth.WelcomeText>
                Entre com seu e-mail e senha para acessar a plataforma
              </styledAuth.WelcomeText>

              {/* form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <styledAuth.FormInputsGap>
                  <div>
                    <styledAuth.Label htmlFor="email">E-mail</styledAuth.Label>
                    <styledAuth.Input
                      placeholder="email@example.com"
                      id="email"
                      type="email"
                      {...register('email', { required: true })}
                    />
                    {errors.email && <RequiredInputMessage />}
                  </div>

                  <div>
                    <styledAuth.Label htmlFor="password">
                      Senha
                    </styledAuth.Label>

                    <styledAuth.PasswordInputContainer>
                      <styledAuth.Input
                        isPassword={true}
                        placeholder="********"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: true })}
                      />
                      <styledAuth.IconEyePasswordContainer>
                        {showPassword ? (
                          <EyeSlash
                            size={24}
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <Eye
                            size={24}
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </styledAuth.IconEyePasswordContainer>
                    </styledAuth.PasswordInputContainer>

                    {errors.password && <RequiredInputMessage />}
                    <styled.ResetPasswordLink>
                      <span onClick={() => navigate('/auth/reset-password')}>
                        Esqueceu sua senha?
                      </span>
                    </styled.ResetPasswordLink>
                  </div>

                  {/* alert */}
                  {alert && alert.show && (
                    <AlertComponent
                      size="md"
                      type={alertTypeEnum.ERRO}
                      message={alert.message}
                      onClose={() => setAlert(null)}
                    />
                  )}

                  <div>
                    <ButtonSubmit text="Entrar" loading={loading} />
                  </div>

                  <div>
                    <styledAuth.EndFormLinkContainer>
                      <p>
                        Não tem conta?{' '}
                        <span onClick={() => navigate('/auth/register')}>
                          Crie uma
                        </span>
                      </p>
                    </styledAuth.EndFormLinkContainer>
                  </div>
                </styledAuth.FormInputsGap>
              </form>
            </styledAuth.CardFormBg>
          </styledAuth.CardFormContainer>
        </styledAuth.LeftScreen>

        {/* coluna ilustrativa */}
        <styledAuth.RightScreen>
          <styledAuth.WelcomeRightContainer>
            <img src={LogoBlack} alt="ToDo" width={'126px'} height={'48px'} />
            <styledAuth.WelcomeRightSectionTitle>
              Bem-vindo a sua plataforma de tarefas
            </styledAuth.WelcomeRightSectionTitle>
            <styledAuth.WelcomeRightSectionText>
              Conecte-se para salvar suas tarefas e organizar seu dia a dia
            </styledAuth.WelcomeRightSectionText>
          </styledAuth.WelcomeRightContainer>
        </styledAuth.RightScreen>
      </styledAuth.MainGridContent>
    </styledAuth.Container>
  );
}

export default AuthLogin;
