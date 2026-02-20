import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

// Login de usuario
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login-user`, credentials, {
      withCredentials: true,
    });
    console.log("Respuesta recibida:", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en loginUser:", error.response?.data || error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};

export const allLotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/lote`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en allLotes:", error.response?.data || error.message);}
    else {
      console.error("Error desconocido:", error);
    }
  }
}

export const allGanado = async () => {
  try {
    const response = await axios.get(`${API_URL}/ganado`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en allGanado:", error.response?.data || error.message);}
    else {
      console.error("Error desconocido:", error);
    }
  }
}