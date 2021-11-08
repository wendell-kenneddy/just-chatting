import { FiCopy } from 'react-icons/fi';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';

import styles from './styles.module.scss';

interface ICopyButtonProps {
  id: string;
}

export function CopyButton({ id }: ICopyButtonProps) {
  return (
    <button
      className={styles.copyButton}
      type="button"
      onClick={() => copyTextToClipboard(id)}
    >
      <FiCopy color="#fff" size="24" />

      <span>Copiar ID</span>
    </button>
  );
}
