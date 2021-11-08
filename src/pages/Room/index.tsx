import { useParams, useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';

import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import { off, onValue, push, ref } from '@firebase/database';
import { db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { CopyButton } from '../../components/CopyButton';
import { MessageList } from '../../components/MessageList';
import { IMessage } from '../../components/Message';
import { NoRouteMatch } from '../../components/NoRouteMatch';
import { useLoginInfo } from '../../hooks/useLoginInfo';
import toast from 'react-hot-toast';
import { LoadingScreen } from '../../components/LoadingScreen';

interface IRoomParams {
  id: string;
}

export interface IRoom {
  id: string;
  name: string;
  creatorId: string;
  messages: Record<string, IFirebaseMessage>;
}

interface IFirebaseMessage {
  author: {
    name: string;
    avatar: string;
    id: string;
  };
  content: string;
}

export function Room() {
  const history = useHistory();
  const params = useParams<IRoomParams>();
  const roomId = params.id;
  const [room, setRoom] = useState<IRoom | null>(null);
  const { user } = useAuth();
  const { isLogged } = useLoginInfo();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    toast.remove();

    const roomRef = ref(db, `rooms/${roomId}`);

    if (!isLogged) {
      off(roomRef);
      return history.push('/');
    }

    onValue(roomRef, (snapshot) => {
      if (!snapshot.exists()) {
        off(roomRef);
        setRoom(null);
        setMessages([]);
        setIsLoading(false);
        return;
      }

      const roomSnapshot = snapshot.val() as IRoom;
      const messages = Object.entries(roomSnapshot.messages ?? {}).map(
        ([key, val]) => {
          return {
            id: key,
            author: val.author,
            content: val.content
          };
        }
      );

      setRoom(roomSnapshot);
      setMessages(messages);
      setIsLoading(false);
    });

    return () => off(roomRef);
  }, [roomId, user?.id, user, history, isLogged]);

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const message = {
      author: user,
      content: newMessage
    };

    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    await push(messagesRef, message);
    setNewMessage('');
  }

  return isLoading ? (
    <LoadingScreen />
  ) : room ? (
    <>
      <header className={styles.header}>
        <Link to="/dashboard">
          <FiArrowLeft color="#FFF" size="24" />
        </Link>

        <div>
          <CopyButton id={roomId} />
        </div>
      </header>

      <div className={styles.bg}></div>

      <main className={styles.mainContent}>
        <h2 className={styles.roomName}>{room.name}</h2>

        <section className={styles.messages}>
          <MessageList messages={messages} />
        </section>

        <section className={styles.messageInput}>
          <form autoComplete="off" onSubmit={handleSendMessage}>
            <label htmlFor="message" className={styles.srOnly}>
              Conteúdo da mensagem
            </label>
            <input
              name="message"
              id="message"
              placeholder="Conteúdo da mensagem"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />

            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </form>
        </section>
      </main>
    </>
  ) : (
    <NoRouteMatch message="Sala removida ou inexistente" />
  );
}
