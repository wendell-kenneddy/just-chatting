import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLoginInfo } from '../../hooks/useLoginInfo';
import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Navbar } from '../../components/Navbar';
import styles from './styles.module.scss';
import toast from 'react-hot-toast';

import { push, ref } from 'firebase/database';
import { db } from '../../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const { isLogged } = useLoginInfo();
  const [roomName, setRoomName] = useState('');
  const history = useHistory();

  useEffect(() => {
    toast.remove();
    if (!isLogged) return history.push('/');
  }, [isLogged, history]);

  async function createRoom(e: FormEvent) {
    try {
      toast.dismiss();

      e.preventDefault();

      if (roomName.trim() === '') return toast.error('Nome necessário');

      const roomRef = ref(db, 'rooms');
      await push(roomRef, {
        name: roomName,
        authorId: user?.id
      });

      history.push('/dashboard');
      toast.success('Sala criada com sucesso!');
    } catch (error) {
      toast.error('Oops, algo deu errado...');
    }
  }

  return (
    <>
      <Navbar />

      <div className={styles.bgImg}></div>
      <main className={styles.mainContent}>
        <h2>Criar sala</h2>

        <form
          className={styles.createRoomForm}
          onSubmit={createRoom}
          autoComplete="off"
        >
          <Input
            name="room-name"
            label="Nome da sala *"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
          />

          <p>O código para entrar na sala é gerado automaticamente.</p>

          <Button variant="contained" color="primary" type="submit">
            Criar sala
          </Button>
        </form>
      </main>
    </>
  );
}
