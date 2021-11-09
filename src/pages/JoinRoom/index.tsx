import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginInfo } from '../../hooks/useLoginInfo';

import { sanitizeText } from '../../utils/sanitizeText';

import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import styles from './styles.module.scss';
import toast from 'react-hot-toast';

import { child, get, ref } from '@firebase/database';
import { db } from '../../services/firebase';

export default function JoinRoom() {
  const { isLogged } = useLoginInfo();
  const [roomId, setRoomId] = useState('');
  const history = useHistory();

  useEffect(() => {
    toast.remove();
    if (!isLogged) return history.push('/');
  }, [history, isLogged]);

  async function findRoom() {
    const sanitizedRoomId = sanitizeText(roomId);
    const dbRef = ref(db, 'rooms');
    const roomRef = await get(child(dbRef, `${sanitizedRoomId}`));

    return roomRef.exists();
  }

  async function enterRoom(e: FormEvent) {
    try {
      e.preventDefault();

      const sanitizedRoomId = sanitizeText(roomId);

      if (!roomId.trim()) return toast.error('ID Necessário.');
      if (!sanitizedRoomId) return toast.error('ID inválido.');

      const roomExists = await findRoom();

      if (!roomExists) return toast.error('Sala inexistente');

      return history.push(`/room/${sanitizedRoomId}`);
    } catch (error) {
      toast.error('Oops... Algo deu errado');
    }
  }

  return (
    <>
      <Navbar />

      <div className={styles.bgImg}></div>

      <main className={styles.mainContent}>
        <h2>Entrar numa sala</h2>

        <form
          className={styles.createRoomForm}
          autoComplete="off"
          onSubmit={enterRoom}
        >
          <Input
            name="room-id"
            label="ID da sala *"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />

          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </form>
      </main>
    </>
  );
}
