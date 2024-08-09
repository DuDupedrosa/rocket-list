import * as styled from './style/NotFoundStyle';
import NotFoundImage from '../../assets/erro-404.png';
import { ArrowBendUpLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/buttons/Button';

function NotFoundComponent() {
  const navigate = useNavigate();

  return (
    <styled.Container>
      <div>
        <styled.NotFoundImageContainer>
          <img src={NotFoundImage} alt="NOT FOUND IMAGE" />
        </styled.NotFoundImageContainer>
        <styled.NotFoundContent>
          <h2>Página não encontrada!</h2>
          <p>
            A página que você pesquisou não foi encontrada, por favor, clique no
            botão abaixo para voltar a página inicial.
          </p>
        </styled.NotFoundContent>

        <styled.ButtonBackHomeContainer>
          <Button onClick={() => navigate('/')}>
            <ArrowBendUpLeft size={24} />
            Voltar para home
          </Button>
        </styled.ButtonBackHomeContainer>
      </div>
    </styled.Container>
  );
}

export default NotFoundComponent;
