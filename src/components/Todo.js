import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Todo() {
  const [input, setInput] = useState(''),
    [todoList, setTodoList] = useState([]);

  useEffect(() => (async () => {
    const res = await axios.get('https://react-hooks-demo-4a91c.firebaseio.com/todos.json');
    const todos = await Object.values(res.data).map(e => e.name);
    setTodoList(todos);
  })());

  const todoAddHandler = () => {
    setTodoList([ ...todoList, input ])
    axios.post('https://react-hooks-demo-4a91c.firebaseio.com/todos.json', { name: input })
      .then(console.log)
      .catch(console.log);
    setInput('');
  }

  return (
    <div>
      <>
        <input type="text"
          placeholder="Todo"
          onChange={evt => setInput(evt.target.value)}
          value={input}
        />
        <button
          type="button"
          onClick={todoAddHandler}
        >Add</button>
        <ul>
          {todoList.map(todo => <li key={todo}>{todo}</li>)}
        </ul>
      </>
    </div>
  );
};
