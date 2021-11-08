import { FaUserCircle } from 'react-icons/fa';
import { truncateText } from '../../utils/truncateText';
import styles from './styles.module.scss';

export interface IMessage {
  id: string;
  author: {
    name: string;
    avatar: string;
    id: string;
  };
  content: string;
}

interface IMessageProps {
  message: IMessage;
}

export function Message({ message }: IMessageProps) {
  return (
    <li className={styles.messageContainer}>
      {message.author.avatar ? (
        <img
          src={message.author.avatar}
          alt="Imagem de usuário"
          width="40"
          height="40"
          referrerPolicy="no-referrer"
        />
      ) : (
        <FaUserCircle size="40" color="#fff" />
      )}

      <div>
        <span className={styles.messageAuthorName}>
          {message.author.name || `User ${truncateText(message.author.id, 10)}`}
        </span>
        <span>{message.content}</span>
      </div>
    </li>
  );
}
