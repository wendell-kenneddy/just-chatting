import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth';
import { LoginInfoContextProvider } from './contexts/loginInfo';

import { NoRouteMatch } from './components/NoRouteMatch';
import { LoadingScreen } from './components/LoadingScreen';
import { Toaster } from 'react-hot-toast';

const NewRoom = lazy(() => import('./pages/NewRoom'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const JoinRoom = lazy(() => import('./pages/JoinRoom'));
const Landing = lazy(() => import('./pages/Landing'));
const Room = lazy(() => import('./pages/Room'));

export function App() {
  return (
    <LoginInfoContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Toaster />
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/room/create" exact component={NewRoom} />
              <Route path="/room/enter" exact component={JoinRoom} />
              <Route path="/room/:id" exact component={Room} />
              <Route path="*" exact component={NoRouteMatch} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthContextProvider>
    </LoginInfoContextProvider>
  );
}
