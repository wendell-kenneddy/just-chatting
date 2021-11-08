import { useContext } from 'react';
import { LoginInfoContext } from '../contexts/loginInfo';

export function useLoginInfo() {
  const context = useContext(LoginInfoContext);

  return context;
}
