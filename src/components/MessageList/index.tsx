import { IMessage, Message } from '../Message';

import styles from './styles.module.scss';

interface IMessageListProps {
  messages: IMessage[];
}

export function MessageList({ messages }: IMessageListProps) {
  return (
    <ul className={styles.messageList}>
      {messages.length > 0 &&
        messages.map(message => {
          return <Message message={message} key={message.id} />;
        })}
    </ul>
  );
}
