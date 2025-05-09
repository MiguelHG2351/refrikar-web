// RegisterForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons/Icons';

interface RegisterFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onFormSubmit = (data: { email: string; password: string }) => {
    onSubmit(data);
  };

  return (
    <div style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit(onFormSubmit)} aria-label="login-form">
        <label>
          Correo
          <input
            {...register('email', { required: 'El correo es obligatorio', validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Formato inválido' })}
            type="email"
            placeholder="Ingrese su correo"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </label>
        <label>
          Contraseña
          <div style={{ position: 'relative' }}>
            <input
              {...register('password', { required: 'La contraseña es obligatoria' })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingrese su contraseña"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeSlashFilledIcon width={20} height={20} /> : <EyeFilledIcon width={20} height={20} />}
            </button>
          </div>
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default RegisterForm;