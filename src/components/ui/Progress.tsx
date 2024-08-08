import styled from 'styled-components';

const ProgressRelative = styled.div`
  position: relative;
  width: 100%; /* Certifica que o container tenha largura total */
`;

const ProgressContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  background-color: ${({ bg }: { bg: string; width: string }) => bg};
  opacity: 0.1;
  height: 8px;
`;

const ProgressLine = styled.div`
  border-radius: 8px;
  background-color: ${({ bg }: { bg: string; width: string }) => bg};
  width: ${({ width }: { bg: string; width: string }) => width};
  opacity: 1;
  height: 8px;
  position: absolute;
  top: 0;
  transition: width 0.8s ease-in-out; /* Adiciona animação na largura */
`;

function Progress({ width, bg }: { width: string; bg: string }) {
  return (
    <ProgressRelative>
      <ProgressContainer width={width} bg={bg}></ProgressContainer>
      <ProgressLine width={width} bg={bg} />
    </ProgressRelative>
  );
}

export default Progress;
