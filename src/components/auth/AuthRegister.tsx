import React, { useState } from 'react';
import * as styledAuth from './style/AuthStyle';
import RequiredInputMessage from '../form/RequiredInputMessage';
import LogoBlack from '../../assets/logo-black.svg';
import Logo from '../../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { validateEmail } from '../../helpers/validator/validEmail';
import { validatePassword } from '../../helpers/validator/validatePassword';
import ButtonSubmit from '../ui/buttons/ButtonSubmit';
import Progress from '../ui/Progress';
import AlertComponent from '../ui/AlertComponent';
import { alertTypeEnum } from '../../helpers/enums/alertEnum';
import ValidateStrengthPassword from '../ValidateStrengthPassword';

type Inputs = {
  name: string;
  email: string;
  password: string;
};
function AuthRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isValidEmail, setIsEmailValid] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<string | true>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    if (!isValidEmail || !validateEmail(data.email)) return;

    if (!isValidPassword || validatePassword(data.password) !== true) return;

    console.log('%c⧭', 'color: #733d00', data);
    setLoading(false);
  };

  function handleBlurEmail(e: React.FocusEvent<HTMLInputElement, Element>) {
    setIsEmailValid(validateEmail(e.target.value));
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isValidEmail) {
      setIsEmailValid(validateEmail(e.target.value));
    }
  }

  function validatePasswordOnEvent(password: string) {
    const valid: { enum: number; key: string } | boolean =
      validatePassword(password);

    if (typeof valid === 'object') {
      setIsValidPassword(valid.key);
      return;
    }

    setIsValidPassword(true);
  }

  function handleBlurPassword(e: React.FocusEvent<HTMLInputElement, Element>) {
    validatePasswordOnEvent(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (isValidPassword !== true) {
      validatePasswordOnEvent(e.target.value);
    }
  }

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
              <styledAuth.WelcomeTitle>Crie sua conta</styledAuth.WelcomeTitle>
              <styledAuth.WelcomeText>
                Preencha os campos abaixo para se cadastrar em nossa plataforma
              </styledAuth.WelcomeText>

              {/* form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <styledAuth.FormInputsGap>
                  <div>
                    <styledAuth.Label htmlFor="name">Nome</styledAuth.Label>
                    <styledAuth.Input
                      {...register('name', { required: true })}
                      placeholder="name"
                      id="name"
                      type="text"
                    ></styledAuth.Input>
                    {errors.name && <RequiredInputMessage />}
                  </div>

                  <div>
                    <styledAuth.Label htmlFor="email">E-mail</styledAuth.Label>
                    <styledAuth.Input
                      {...(register('email'), { required: true })}
                      placeholder="email@example.com"
                      id="email"
                      type="email"
                      onBlur={(e) => handleBlurEmail(e)}
                      onChange={(e) => handleChangeEmail(e)}
                    ></styledAuth.Input>
                    {errors.email && <RequiredInputMessage />}
                    {!isValidEmail && (
                      <RequiredInputMessage customMessage="Formato de e-mail inválido" />
                    )}
                  </div>

                  <div>
                    <styledAuth.Label htmlFor="password">
                      Senha
                    </styledAuth.Label>

                    <styledAuth.PasswordInputContainer>
                      <styledAuth.Input
                        isPassword={true}
                        {...register('password', { required: true })}
                        placeholder="********"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        onBlur={(e) => handleBlurPassword(e)}
                        onChange={(e) => handleChangePassword(e)}
                      ></styledAuth.Input>
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
                    {typeof isValidPassword === 'string' && (
                      <RequiredInputMessage customMessage={isValidPassword} />
                    )}
                  </div>

                  {password && (
                    <ValidateStrengthPassword userPassword={password} />
                  )}

                  <div>
                    <ButtonSubmit text="Cadastrar" loading={loading} />
                  </div>

                  <div>
                    <styledAuth.EndFormLinkContainer>
                      <p>
                        Já tem uma conta?{' '}
                        <span onClick={() => navigate('/auth')}>Entrar</span>
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

export default AuthRegister;
