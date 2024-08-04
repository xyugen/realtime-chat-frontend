import type { Component } from 'solid-js';
import Input from './components/input';
import { Route, Router } from '@solidjs/router';
import Login from './Login';
import Register from './Register';

const App: Component = () => {
  return (
    <div class='w-screen h-screen flex justify-center items-center bg-seagull-100'>
      <Router>
        <Route path='/' component={Login} />
        <Route path='register' component={Register} />
      </Router>
    </div>
  );
};

export default App;
