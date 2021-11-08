import styles from './styles.module.scss';

export function LoadingScreen() {
  return (
    <main className={styles.mainContent}>
      <h1 className={styles.animatedTitle}>Carregando...</h1>
    </main>
  );
}
