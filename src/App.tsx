import React, { useState } from 'react';
import './App.css';
import Form, { Service } from './components/Form';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [hidePasswords, setHidePasswords] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addService = (newService: Service) => {
    setServices([...services, newService]);
    toggleForm();
  };

  const removeService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);

    if (updatedServices.length === 0) {
      setNoServicesMessage('Nenhuma senha cadastrada');
    }
  };

  const toggleHidePasswords = () => {
    setHidePasswords(!hidePasswords);
  };

  const [noServicesMessage, setNoServicesMessage] = useState('');

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {services.length === 0 ? <p>{noServicesMessage}</p> : null}
      {services.map((service, index) => (
        <div key={ index }>
          <a href={ service.url } target="_blank" rel="noopener noreferrer">
            {service.serviceName}
          </a>
          <p>
            Login:
            {service.login}
          </p>
          <p>
            Senha:
            {' '}
            {hidePasswords ? (
              '******'
            ) : (
              <span data-testid={ `service-password-${index}` }>{service.password}</span>
            )}
          </p>
          <button
            onClick={ () => removeService(index) }
            data-testid={ `remove-btn-${index}` }
          >
            Remover
          </button>
        </div>
      ))}
      {showForm ? (
        <Form onCancel={ toggleForm } onAddService={ addService } />
      ) : (
        <button onClick={ toggleForm }>Cadastrar nova senha</button>
      )}
      <label htmlFor="hidePasswords">Esconder senhas</label>
      <input
        type="checkbox"
        id="hidePasswords"
        checked={ hidePasswords }
        onChange={ toggleHidePasswords }
      />
    </div>
  );
}

export default App;
