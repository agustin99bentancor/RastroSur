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

// Logout de usuario
export const logoutUser = async () => {
    console.log("Intentando logout...");
    try {
        await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
        return true;
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
        return false;
      }
}

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

export const allEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en allEvents:", error.response?.data || error.message);}
    else {
      console.error("Error desconocido:", error);
    }
  }
}

export const dashboardInfo = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/${empresaId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en dashboardInfo:", error.response?.data || error.message);
    } else {
      console.error("Error desconocido:", error);
    }
  }
}