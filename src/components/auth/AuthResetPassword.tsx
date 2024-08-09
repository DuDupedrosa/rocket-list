import * as styled from './style/AuthResetPasswordStyle';
import DevImage from '../../assets/rede.png';
import { ArrowBendUpLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/buttons/Button';

function AuthResetPassword() {
  const navigate = useNavigate();

  return (
    <styled.Container>
      <div>
        <styled.ImageContainer>
          <img src={DevImage} alt="NOT FOUND IMAGE" />
        </styled.ImageContainer>
        <styled.Content>
          <h2>Página em desenvolvimento!</h2>
          <p>
            Esta página está em desenvolvimento pela nossa equipe e ainda não
            está disponível. Por favor, retorne à página de autenticação.
          </p>
        </styled.Content>

        <styled.ButtonBackContainer>
          <Button onClick={() => navigate('/auth')}>
            <ArrowBendUpLeft size={24} />
            Voltar para autenticação
          </Button>
        </styled.ButtonBackContainer>
      </div>
    </styled.Container>
  );
}

export default AuthResetPassword;
