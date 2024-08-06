import type { Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import { Toaster } from 'solid-sonner';

// Pages
import { Chat, Home, Login, NotFound, Register } from './pages';

const App: Component = () => {
  return (
    <div class='w-screen h-screen flex justify-center items-center bg-seagull-100'>
      <Router>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/c' component={Chat} />
        <Route path='*404' component={NotFound} />
      </Router>
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
