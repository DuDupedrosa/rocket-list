import { useEffect, useState } from 'react';
import { InputForm, Label } from '../../../style/styled-components/Form';
import PasswordRulesCheckList from '../../PasswordRulesCheckList';
import Button from '../../ui/buttons/Button';
import * as profileStyle from '../style/ProfileStyle';
import * as style from './style/ProfileChangePasswordStyle';
import { Eye, EyeSlash } from 'phosphor-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RequiredInputMessage from '../../form/RequiredInputMessage';
import { validatePassword } from '../../../helpers/validator/validatePassword';
import ValidateStrengthPassword from '../../ValidateStrengthPassword';
import { UserProfile } from '../../../types/user';
import { getUserProfile } from '../../../helpers/api-requests/user';
import AlertComponent from '../../ui/AlertComponent';
import { alertTypeEnum } from '../../../helpers/enums/alertEnum';
import http from '../../../api/http';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { errorStatusEnum } from '../../../helpers/enums/errorStatusEnum';

type Inputs = {
  currentPassword: string;
  newPassword: string;
};

function ProfileChangePassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<string | true>(true);
  const [showAlertValidatePassword, setShowAlertValidatePassword] =
    useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [alertWrongCurrentPassword, setAlertWrongCurrentPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    currentPassword,
    newPassword,
  }) => {
    setShowAlertValidatePassword(false);
    setAlertWrongCurrentPassword(false);
    setLoading(true);

    try {
      if (!isValidPassword || validatePassword(newPassword) !== true) return;

      if (!user) return;

      let payload: {
        userId: string;
        currentPassword: string;
        newPassword: string;
      } = {
        currentPassword,
        newPassword,
        userId: user.id,
      };

      const { data } = await http.put(`/user/change-password`, payload);
      navigate('/profile');
      toast.success('Senha alterada com sucesso');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        let status: number;

        if (err.response) {
          status = err.response.status;

          if (status === errorStatusEnum.BAD_REQUEST) {
            if (err.response.data.message === 'invalid_current_password') {
              setAlertWrongCurrentPassword(true);
            }
          }
        }
      }
    }

    setLoading(false);
  };

  function validatePasswordOnEvent(password: string) {
    setShowAlertValidatePassword(true);
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

  async function handleGetUserProfile() {
    const userProfile: UserProfile = await getUserProfile();

    setUser(userProfile);
  }

  useEffect(() => {
    handleGetUserProfile();
  }, []);

  return (
    <div>
      <profileStyle.Container>
        <profileStyle.Title>Alterar senha</profileStyle.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <style.InputGaps>
            <div>
              <Label htmlFor="currentPassword">Senha atual:</Label>

              <style.PasswordInputContainer>
                <InputForm
                  type={showPassword ? 'text' : 'password'}
                  id="currentPassword"
                  {...register('currentPassword', { required: true })}
                />
                {errors.currentPassword && <RequiredInputMessage />}

                <style.IconEyePasswordContainer>
                  {showPassword ? (
                    <EyeSlash
                      size={24}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye size={24} onClick={() => setShowPassword(true)} />
                  )}
                </style.IconEyePasswordContainer>
              </style.PasswordInputContainer>
            </div>

            <div>
              <Label htmlFor="newPassword">Nova senha:</Label>

              <style.PasswordInputContainer>
                <InputForm
                  {...register('newPassword', {
                    required: true,
                    onChange: (e) => {
                      handleChangePassword(e);
                    },
                    onBlur: (e) => {
                      handleBlurPassword(e);
                    },
                  })}
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                />
                {errors.newPassword && <RequiredInputMessage />}
                {typeof isValidPassword === 'string' && (
                  <RequiredInputMessage customMessage={isValidPassword} />
                )}

                <style.IconEyePasswordContainer>
                  {showNewPassword ? (
                    <EyeSlash
                      size={24}
                      onClick={() => setShowNewPassword(false)}
                    />
                  ) : (
                    <Eye size={24} onClick={() => setShowNewPassword(true)} />
                  )}
                </style.IconEyePasswordContainer>
              </style.PasswordInputContainer>
            </div>

            {password && showAlertValidatePassword && (
              <ValidateStrengthPassword userPassword={password} />
            )}
          </style.InputGaps>

          <PasswordRulesCheckList />

          {alertWrongCurrentPassword && (
            <style.AlertContainer>
              <AlertComponent
                size="md"
                type={alertTypeEnum.ERRO}
                message="Senha atual incorreta."
                onClose={() => setAlertWrongCurrentPassword(false)}
              />
            </style.AlertContainer>
          )}
          <style.ButtonContainer>
            <Button loading={loading}>Enviar</Button>
          </style.ButtonContainer>
        </form>
      </profileStyle.Container>
    </div>
  );
}

export default ProfileChangePassword;
