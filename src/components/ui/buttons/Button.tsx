import styled from 'styled-components';
import LoadingSpinner from '../loadingSpinner';

interface ButtonComponentProps {
  bg?: string;
  color?: string;
  height?: string;
  svgW?: string;
  svgH?: string;
  svgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  loading?: boolean;
  radius?: string;
  borderColor?: string;
}

const ButtonComponent = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--family-text);
  font-weight: ${({ fontWeight }: ButtonComponentProps) =>
    fontWeight ? fontWeight : 'bold'};
  font-size: ${({ fontSize }: ButtonComponentProps) =>
    fontSize ? fontSize : '16px'};
  line-height: 1.4;
  color: ${({ color }: ButtonComponentProps) =>
    color ? color : 'var(--gray-100)'};
  background-color: ${({ bg }: ButtonComponentProps) =>
    bg ? bg : 'var(--mainBlue)'};
  border-radius: ${({ radius }: ButtonComponentProps) =>
    radius ? radius : '8px'};
  height: ${({ height }: ButtonComponentProps) => (height ? height : '44px')};
  border: none;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid
    ${({ borderColor }: ButtonComponentProps) =>
      borderColor ? borderColor : 'transparent'};

  svg {
    width: ${({ svgW }: ButtonComponentProps) => (svgW ? svgW : '24px')};
    height: ${({ svgH }: ButtonComponentProps) => (svgH ? svgH : '24px')};
    color: ${({ svgColor }: ButtonComponentProps) =>
      svgColor ? svgColor : 'var(--gray-100)'};
  }

  :hover {
    box-shadow: ${({ bg }: ButtonComponentProps) =>
      bg ? `0 0 0 2px ${bg}` : '0 0 0 2px var(--mainBlue)'};
    outline: none;
  }

  :disabled {
    opacity: 0.6;
    cursor: ${({ loading }: ButtonComponentProps) =>
      loading ? 'wait' : 'not-allowed'};

    :hover {
      box-shadow: none;
    }
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;

  // estilos
  bg?: string;
  color?: string;
  height?: string;
  svgW?: string;
  svgH?: string;
  svgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  radius?: string;
  borderColor?: string;
}
function Button({
  loading,
  disabled,
  children,
  onClick,
  bg,
  color,
  height,
  svgH,
  svgW,
  svgColor,
  fontSize,
  fontWeight,
  radius,
  borderColor,
}: ButtonProps) {
  return (
    <ButtonComponent
      bg={bg}
      color={color}
      height={height}
      svgH={svgH}
      svgW={svgW}
      svgColor={svgColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      radius={radius}
      type="submit"
      disabled={loading || disabled}
      loading={loading}
      borderColor={borderColor}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {loading && <LoadingSpinner size="sm" />}
      {!loading && children}
    </ButtonComponent>
  );
}

export default Button;
