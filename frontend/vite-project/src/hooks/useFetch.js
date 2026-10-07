// Custom Hook reutilizable para peticiones GET con fetch enviando cookies (credentials: 'include')

import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función de petición declarada fuera del useEffect e invocada internamente[cite: 16, 17, 19]
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          credentials: 'include' // Envía la cookie de autenticación[cite: 17, 19]
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo obtener la información`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};