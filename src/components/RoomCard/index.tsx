import { ref, remove } from '@firebase/database';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import { IRoom } from '../../pages/Room';
import { db } from '../../services/firebase';
import { Button } from '../Button';
import styles from './styles.module.scss';

interface IRoomCardProps {
  room: IRoom;
}

export function RoomCard({ room }: IRoomCardProps) {
  const history = useHistory();

  async function deleteRoom(roomId: string) {
    try {
      const roomRef = ref(db, `rooms/${roomId}`);
      await remove(roomRef);
      toast.success('Sala excluída com sucesso!');
    } catch (error) {
      toast.error('Oops... Algo deu errado');
    }
  }

  return (
    <li className={styles.card} key={room.id}>
      <div>
        <span className={styles.roomName}>{room.name}</span>
      </div>

      <div className={styles.buttonGroup}>
        <Button
          variant="outlined"
          color="error"
          type="button"
          onClick={() => deleteRoom(room.id)}
        >
          Excluir
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => history.push(`/room/${room.id}`)}
        >
          Entrar
        </Button>
      </div>
    </li>
  );
}
