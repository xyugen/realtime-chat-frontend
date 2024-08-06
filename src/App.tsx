import { lazy, type Component } from 'solid-js';
import { Router } from '@solidjs/router';
import { Toaster } from 'solid-sonner';

// Pages
import { Home } from './pages';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: lazy(() => import('./pages/auth/Login')) },
  { path: '/register', component: lazy(() => import('./pages/auth/Register')) },
  { path: '/c', component: lazy(() => import('./pages/chat/Chat')) },
  { path: '/*404', component: lazy(() => import('./pages/NotFound')) },
]

const App: Component = () => {
  return (
    <div class='w-screen h-screen flex justify-center items-center bg-seagull-100'>
      <Router>{routes}</Router>
      <Toaster
        toastOptions={{
          classes: {
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-seagull-500 text-white',
            success: 'bg-green-500 text-white',
          }
        }}
      />
    </div>
  );
};

export default App;
