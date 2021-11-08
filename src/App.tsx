import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth';
import { NewRoom } from './pages/NewRoom';
import { Dashboard } from './pages/Dashboard';
import { JoinRoom } from './pages/JoinRoom';
import { Landing } from './pages/Landing';
import { Room } from './pages/Room';
import { NoRouteMatch } from './components/NoRouteMatch';
import { Toaster } from 'react-hot-toast';
import { LoginInfoContextProvider } from './contexts/loginInfo';

export function App() {
  return (
    <LoginInfoContextProvider>
      <AuthContextProvider>
        <Toaster />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/room/create" exact component={NewRoom} />
            <Route path="/room/enter" exact component={JoinRoom} />
            <Route path="/room/:id" exact component={Room} />
            <Route path="*" exact component={NoRouteMatch} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </LoginInfoContextProvider>
  );
}
