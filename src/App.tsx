// App.tsx
import React, { useState } from 'react';
import './App.css';
import Form, { Service } from './components/Form';
import ServiceItem from './components/ServiceItem';

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
  };

  const toggleHidePasswords = () => {
    setHidePasswords(!hidePasswords);
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {services.length === 0 ? <p>Nenhuma senha cadastrada</p> : null}
      {services.map((service, index) => (
        <ServiceItem
          key={ index }
          service={ service }
          onRemove={ () => removeService(index) }
          hidePasswords={ hidePasswords }
        />
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
