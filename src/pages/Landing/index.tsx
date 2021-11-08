import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import heroImg from '../../assets/hero.svg';
import styles from './styles.module.scss';

export function Landing() {
  const { user, signInWithGoogle } = useAuth();

  useEffect(() => {
    toast.remove();
  }, []);

  return (
    <>
      <Navbar />

      <main className={styles.mainContent}>
        <section className={styles.description}>
          <div>
            <h1>Chat em tempo real.</h1>
            <p>
              Crie salas e compartilhe com seus amigos, fácil e intuitivamente.
            </p>

            {user ? (
              <Button variant="contained" color="white" type="button">
                <Link to="/dashboard">Acessar a Dashboard</Link>
              </Button>
            ) : (
              <Button
                variant="contained"
                color="white"
                type="button"
                onClick={signInWithGoogle}
              >
                Login com o Google
              </Button>
            )}
          </div>

          <img src={heroImg} alt="Ilustração de chat" />
        </section>
      </main>
    </>
  );
}
