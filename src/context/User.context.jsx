import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  if (token) {
    const { name } = jwtDecode(token);
  }
  return (
    <UserContext.Provider value={{ token, setToken, name }}>
      {children}
    </UserContext.Provider>
  );
}
