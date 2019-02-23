import React, { useContext } from 'react';
import AuthContext from '../auth-context';

export default function Header(props) {
  const { status } = useContext(AuthContext);
  return (
    <header>
      <button onClick={props.loadTodos} disabled={!status}>Todo List</button> | <button onClick={props.loadAuth}>Auth</button>
    </header>
  );
};
