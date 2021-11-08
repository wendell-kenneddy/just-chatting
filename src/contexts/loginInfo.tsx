import { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ILoginInfoContextProps {
  children: ReactNode;
}

interface ILoginInfoContextData {
  isLogged: string | null;
  updateLoginInfo: (hasSignedIn: boolean) => void;
}

export const LoginInfoContext = createContext({} as ILoginInfoContextData);

export function LoginInfoContextProvider({ children }: ILoginInfoContextProps) {
  const [isLogged, setIsLogged] = useLocalStorage('@justchatting:login', null);

  function updateLoginInfo(hasSignedIn: boolean) {
    if (!hasSignedIn) {
      setIsLogged(null);
      return;
    }

    setIsLogged('signedIn');
  }

  return (
    <LoginInfoContext.Provider value={{ isLogged, updateLoginInfo }}>
      {children}
    </LoginInfoContext.Provider>
  );
}
