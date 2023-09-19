import React from 'react';
import { Service } from './Form';

type ServiceItemProps = {
  service: Service;
  onRemove: () => void;
  hidePasswords: boolean;
};

function ServiceItem({ service, onRemove, hidePasswords }: ServiceItemProps) {
  const { serviceName, url, login, password } = service;

  return (
    <div>
      <a href={ url } target="_blank" rel="noopener noreferrer">
        {serviceName}
      </a>
      <p>
        Login:
        {login}
      </p>
      <p>
        Senha:
        {hidePasswords ? '******' : password}
      </p>
      <button onClick={ onRemove } data-testid="remove-btn">
        Remover
      </button>
    </div>
  );
}

export default ServiceItem;
