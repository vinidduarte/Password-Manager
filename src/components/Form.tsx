// Form.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';


interface FormProps {
  onCancel: () => void;
  onAddService: (service: Service) => void;
}

export interface Service {
  serviceName: string;
  login: string;
  password: string;
  url: string;
}

function Form({ onCancel, onAddService }: FormProps) {
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleServiceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceName(e.target.value);
    validateForm();
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    validateForm();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateForm();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const validateForm = () => {
    const isServiceNameValid = serviceName.trim() !== '';
    const isLoginValid = login.trim() !== '';
    const isPasswordValid =
      password.length >= 8 &&
      password.length <= 16 &&
      /[a-zA-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password);

    setIsButtonDisabled(!(isServiceNameValid && isLoginValid && isPasswordValid));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderValidationMessage = () => {
    const isPasswordValid =
      password.length >= 8 &&
      password.length <= 16 &&
      /[a-zA-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password);

    return (
      <div>
        {password.length >= 8 ? (
          <p className="valid-password-check">Possuir 8 ou mais caracteres</p>
        ) : (
          <p className="invalid-password-check">Possuir 8 ou mais caracteres</p>
        )}
        {password.length <= 16 ? (
          <p className="valid-password-check">Possuir até 16 caracteres</p>
        ) : (
          <p className="invalid-password-check">Possuir até 16 caracteres</p>
        )}
        {/[a-zA-Z]/.test(password) && /\d/.test(password) ? (
          <p className="valid-password-check">Possuir letras e números</p>
        ) : (
          <p className="invalid-password-check">Possuir letras e números</p>
        )}
        {/[!@#$%^&*]/.test(password) ? (
          <p className="valid-password-check">Possuir algum caractere especial</p>
        ) : (
          <p className="invalid-password-check">Possuir algum caractere especial</p>
        )}
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isServiceNameValid = serviceName.trim() !== '';
    const isLoginValid = login.trim() !== '';
    const isPasswordValid =
      password.length >= 8 &&
      password.length <= 16 &&
      /[a-zA-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password);

    if (isServiceNameValid && isLoginValid && isPasswordValid) {
      const newService: Service = {
        serviceName,
        login,
        password,
        url,
      };
      onAddService(newService);
      setPassword(''); // Limpar o campo de senha após o cadastro
      setShowPassword(false); // Resetar o estado do botão de mostrar senha

      // Exibe o alerta com SweetAlert2
      Swal.fire({
        title: 'Serviço cadastrado com sucesso',
        icon: 'success',
        timer: 1500, // Desaparece após 1.5 segundos
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="serviceName">Nome do serviço</label>
        <input
          type="text"
          id="serviceName"
          value={serviceName}
          onChange={handleServiceNameChange}
        />

        <label htmlFor="login">Login</label>
        <input type="text" id="login" value={login} onChange={handleLoginChange} />

        <label htmlFor="password">Senha</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {renderValidationMessage()}

        <label htmlFor="url">URL</label>
        <input type="text" id="url" value={url} onChange={handleUrlChange} />

        <button type="submit" disabled={isButtonDisabled}>
          Cadastrar
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button
          type="button"
          onClick={toggleShowPassword}
          data-testid="show-hide-form-password"
        >
          {showPassword ? 'Esconder senha' : 'Mostrar senha'}
        </button>
      </form>
    </div>
  );
}

export default Form;
