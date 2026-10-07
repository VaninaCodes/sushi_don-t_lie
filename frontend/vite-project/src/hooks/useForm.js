// Custom hook para control reactivo de formularios

import { useState } from 'react';

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  // Forma funcional del setter para preservar los demás campos[cite: 16, 20]
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    handleInputChange,
    handleReset
  };
};