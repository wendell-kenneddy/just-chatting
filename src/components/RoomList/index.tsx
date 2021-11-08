import { IRoom } from '../../pages/Room';
import { RoomCard } from '../RoomCard';

import styles from './styles.module.scss';

interface IRoomListProps {
  rooms: IRoom[];
}

export function RoomList({ rooms }: IRoomListProps) {
  return (
    <ul className={styles.roomList}>
      {rooms.length > 0 &&
        rooms.map(room => {
          return <RoomCard room={room} key={room.id} />;
        })}
    </ul>
  );
}
