import { useEffect, useState } from 'react';
import { useLoginInfo } from '../../hooks/useLoginInfo';
import { useAuth } from '../../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';

import { IRoom } from '../Room';

import { Navbar } from '../../components/Navbar';
import { RoomList } from '../../components/RoomList';
import { Button } from '../../components/Button';
import styles from './styles.module.scss';

import {
  ref,
  onChildAdded,
  onChildRemoved,
  off,
  query,
  orderByChild,
  equalTo
} from '@firebase/database';
import { db } from '../../services/firebase';

export function Dashboard() {
  const { user } = useAuth();
  const { isLogged } = useLoginInfo();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (!isLogged) history.push('/');

    const roomsRef = ref(db, 'rooms');
    const q = query(roomsRef, orderByChild('authorId'), equalTo(`${user?.id}`));

    onChildAdded(q, (snapshot) => {
      const addedRoom = {
        id: snapshot.key,
        ...snapshot.val()
      } as IRoom;

      setRooms((prevState) => [addedRoom, ...prevState]);
    });

    onChildRemoved(roomsRef, (snapshot) => {
      const removedRoom = {
        id: snapshot.key,
        ...snapshot.val()
      } as IRoom;

      setRooms((prevState) =>
        prevState.filter((room) => room.id !== removedRoom.id)
      );
    });

    return () => off(roomsRef);
  }, [user?.id, history, isLogged]);

  return (
    <>
      <Navbar />

      <div className={styles.bgImg}></div>

      <main className={styles.mainContent}>
        <section className={styles.rooms}>
          <h2>Suas salas de Chat</h2>

          <div className={styles.buttonGroup}>
            <Button variant="contained" color="primary">
              <Link to="/room/create">Criar Sala</Link>
            </Button>

            <Button variant="contained" color="primary">
              <Link to="/room/enter">Entrar</Link>
            </Button>
          </div>

          <RoomList rooms={rooms} />
        </section>
      </main>
    </>
  );
}
