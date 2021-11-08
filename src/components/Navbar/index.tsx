import { Button } from '../Button';
import { FaUserCircle } from 'react-icons/fa';

import logoImg from '../../assets/logo.svg';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.scss';

export function Navbar() {
  const { user, logOut, signInWithGoogle } = useAuth();

  return (
    <header className={styles.navbar}>
      <Link to="/">
        <img src={logoImg} alt="Logo" />
      </Link>

      {user ? (
        <>
          <div className={styles.signedInContent}>
            <Button variant="contained" color="primary" onClick={logOut}>
              Sair
            </Button>
            <Link to="/dashboard" className={styles.userImage}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Imagem de usuário"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <FaUserCircle size="32" color="var(--text-gray)" />
              )}
            </Link>
          </div>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={signInWithGoogle}
        >
          Login
        </Button>
      )}
    </header>
  );
}
