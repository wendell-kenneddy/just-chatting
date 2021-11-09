import { useEffect, useRef } from 'react';
import Message, { IMessage } from '../Message';

import styles from './styles.module.scss';

interface IMessageListProps {
  messages: IMessage[];
}

export function MessageList({ messages }: IMessageListProps) {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollDivRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ul className={styles.messageList}>
      {messages.length > 0 &&
        messages.map((message) => {
          return <Message message={message} key={message.id} />;
        })}
      <div ref={scrollDivRef}></div>
    </ul>
  );
}
