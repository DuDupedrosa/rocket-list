import styled from 'styled-components';
import LoadingSpinner from '../loadingSpinner';

export const Button = styled.button`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.4;
  color: var(--gray-100);
  background-color: var(--mainBlue);
  border-radius: 8px;
  height: 44px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  justify-content: center;

  :hover,
  :focus {
    box-shadow: 0 0 0 2px var(--mainBlue);
    outline: none;
  }

  :disabled {
    opacity: 0.6;
    cursor: ${({ loading }: { loading?: boolean }) =>
      loading ? 'wait' : 'not-allowed'};

    :hover {
      box-shadow: none;
    }
  }
`;

function ButtonSubmit({
  text,
  loading,
  disabled,
}: {
  text: string;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Button type="submit" disabled={loading || disabled} loading={loading}>
      {loading ? <LoadingSpinner size="sm" /> : text}
    </Button>
  );
}

export default ButtonSubmit;
