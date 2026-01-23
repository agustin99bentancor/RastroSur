import { useState } from "react";

interface ModalProps {
    onClose: () => void;
    onSuccess: (name: string, password: string) => void;
    error : string | null;
}

export default function LoginModal({ onClose, onSuccess, error }: ModalProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2
            style={{ paddingBottom:'15px', textAlign: 'center' }}
            >Iniciar Sesión</h2>
        <form>
            <input
                style={error ? inputErrorStyle : inputNormalStyle}
                type="text"
                placeholder="Usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                style={error ? inputErrorStyle : inputNormalStyle}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p style={errorMessageStyle}>{error}</p>}
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'left', padding: '5px', gap: '35px' }}>
                <button style={loginButton} type="button" onClick={() => onSuccess(name, password)}>Entrar</button>
                <button style={closeButton} type="button" onClick={onClose}>Cerrar</button>
            </div>
        </form>
      </div>
    </div>
  );
}


const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modal: React.CSSProperties = {
  background: '#fff',
  width: '400px',
  maxWidth: '90%',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

const loginButton: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const closeButton: React.CSSProperties = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const errorMessageStyle: React.CSSProperties = {
  color: 'red',
  marginTop: '10px',
  fontSize: '0.9rem',
  textAlign: 'center',
};

const inputErrorStyle: React.CSSProperties = {
  borderColor: '#ff4d4d', /* Rojo */
  backgroundColor: '#fff2f2',
  paddingBottom:'10px',
  width: '100%',
  padding: '10px',
  marginBottom: '10px' 
};

const inputNormalStyle: React.CSSProperties = {
  paddingBottom:'10px',
  width: '100%',
  padding: '10px',
  marginBottom: '10px' 
}