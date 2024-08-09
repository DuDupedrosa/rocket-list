import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { alertTypeEnum } from '../helpers/enums/alertEnum';
import Progress from './ui/Progress';
import AlertComponent from './ui/AlertComponent';

const strengthPasswordSteps = {
  default: 0,
  weak: 1,
  medium: 2,
  strong: 3,
  tooStrong: 4,
};

function ValidateStrengthPassword({ userPassword }: { userPassword: string }) {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  function getPasswordStrengthData(passwordStrengthStatus: number) {
    const literal = {
      [strengthPasswordSteps.default]: {
        alert: {
          type: alertTypeEnum.ERRO,
          message:
            'Sua senha é muito fraca! A segurança da sua senha está abaixo do recomendado.',
        },
        progress: {
          width: '25%',
          bg: '#f87171',
        },
      },
      [strengthPasswordSteps.weak]: {
        alert: {
          type: alertTypeEnum.ERRO,
          message:
            'Sua senha é muito fraca! A segurança da sua senha está abaixo do recomendado.',
        },
        progress: {
          width: '25%',
          bg: '#f87171',
        },
      },
      [strengthPasswordSteps.medium]: {
        alert: {
          type: alertTypeEnum.WARNING,
          message:
            'Sua senha é mediana! Sua senha oferece segurança básica, mas poderia ser mais robusta.',
        },
        progress: {
          width: '50%',
          bg: '#ca8a04',
        },
      },
      [strengthPasswordSteps.strong]: {
        alert: {
          type: alertTypeEnum.INFO,
          message: 'Sua senha é forte! Sua senha oferece uma boa segurança.',
        },
        progress: {
          width: '75%',
          bg: '#2563eb',
        },
      },
      [strengthPasswordSteps.tooStrong]: {
        alert: {
          type: alertTypeEnum.SUCCESS,
          message:
            'Sua senha é muito forte! Sua senha atinge um excelente nível de segurança.',
        },
        progress: {
          width: '100%',
          bg: '#16a34a',
        },
      },
    };

    return literal[passwordStrengthStatus];
  }

  function changePassword(userPassword: string) {
    // vai de 0 a strengthPasswordSteps
    const { score } = zxcvbn(userPassword);

    setPasswordStrength(score);
  }

  useEffect(() => {
    changePassword(userPassword);
  }, [userPassword]);

  return (
    <>
      <Progress
        width={getPasswordStrengthData(passwordStrength).progress.width}
        bg={getPasswordStrengthData(passwordStrength).progress.bg}
      />

      <AlertComponent
        size="sm"
        message={getPasswordStrengthData(passwordStrength).alert.message}
        type={getPasswordStrengthData(passwordStrength).alert.type}
        outline={true}
      />
    </>
  );
}

export default ValidateStrengthPassword;
