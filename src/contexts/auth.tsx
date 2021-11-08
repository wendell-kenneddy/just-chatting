import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLoginInfo } from '../hooks/useLoginInfo';

import toast from 'react-hot-toast';

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface IUser {
  name: string | null;
  avatar: string | null;
  id: string;
}

interface IAuthContextProps {
  children: ReactNode;
}

interface IAuthContextData {
  user: null | IUser;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthContextProvider({ children }: IAuthContextProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const { updateLoginInfo } = useLoginInfo();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          avatar: user.photoURL,
          id: user.uid
        });

        updateLoginInfo(true);
        return;
      }

      updateLoginInfo(false);
      return setUser(null);
    });

    return () => unsubscribe();
  }, [updateLoginInfo]);

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Login efetuado com sucesso!');
    } catch (error) {
      toast.error('Algo deu errado com o Login.');
    }
  }

  async function logOut() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
