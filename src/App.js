import React, { useState } from 'react';
import { Provider } from './auth-context';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

export default function App() {
  const [ view, setView ] = useState('auth');
  const [ authStatus, setAuthStatus ] = useState(false);

  return (
    <div className="App">
      <Provider value={{ status: authStatus, login: () => setAuthStatus(true)}}>
        <Header
          loadTodos={() => setView('todo')}
          loadAuth={() => setView('auth')}
        />
        <hr/>
        {view === 'todo' && <Todo />}
        {view === 'auth' && <Auth />}
      </Provider>
    </div>
  );
};
