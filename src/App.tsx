import type { Component } from 'solid-js';
import Input from './components/input';
import { Route, Router } from '@solidjs/router';
import Login from './Login';
import Register from './Register';
import { Toaster } from 'solid-sonner';
import { error } from 'console';

const App: Component = () => {
  return (
    <div class='w-screen h-screen flex justify-center items-center bg-seagull-100'>
      <Router>
        <Route path='/' component={Login} />
        <Route path='register' component={Register} />
      </Router>
      <Toaster
        toastOptions={{
          classes: {
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-seagull-500 text-white',
            success: 'bg-green-500 text-white',
            default: 'bg-seagull-200',
          }
        }}
      />
    </div>
  );
};

export default App;
