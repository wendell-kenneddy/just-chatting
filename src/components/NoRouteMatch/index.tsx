import styles from './styles.module.scss';

import notFoundImg from '../../assets/404.svg';
import { Button } from '../Button';
import { useHistory } from 'react-router';

interface INoRouteMatchProps {
  message?: string;
}

export function NoRouteMatch({ message }: INoRouteMatchProps) {
  const history = useHistory();

  return (
    <main className={styles.content}>
      <img src={notFoundImg} alt="Imagem de erro 404" />

      <h1>{message || 'Oops... Nada por aqui :('}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/dashboard')}
      >
        Voltar para a dashboard
      </Button>
    </main>
  );
}
