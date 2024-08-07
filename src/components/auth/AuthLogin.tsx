import React from 'react';
import * as styled from './style/AuthLoginStyle';
import * as styledAuth from './style/AuthStyle';
import RequiredInputMessage from '../form/RequiredInputMessage';
import LogoBlack from '../../assets/logo-black.svg';
import Logo from '../../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';

function AuthLogin() {
  const navigate = useNavigate();

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
              <styledAuth.FormInputsGap>
                <div>
                  <styledAuth.Label htmlFor="email">E-mail</styledAuth.Label>
                  <styledAuth.Input
                    placeholder="email@example.com"
                    id="email"
                  ></styledAuth.Input>
                  <RequiredInputMessage />
                </div>

                <div>
                  <styledAuth.Label htmlFor="password">Senha</styledAuth.Label>
                  <styledAuth.Input
                    placeholder="********"
                    id="password"
                  ></styledAuth.Input>
                  <styled.ResetPasswordLink>
                    Esqueceu sua senha?
                  </styled.ResetPasswordLink>
                </div>

                <div>
                  <styledAuth.FormTaskButtonSubmit>
                    Entrar
                  </styledAuth.FormTaskButtonSubmit>
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
