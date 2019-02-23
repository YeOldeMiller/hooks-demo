import React, { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';

import List from '../components/List';
import { useFormInput } from '../hooks/forms';

export default function Todo() {
  // const [ inputIsValid, setInputValidity ] = useState(false);
  // const [ input, setInput ] = useState('');
    // [ todoList, setTodoList ] = useState([]),
    // [ submission, setSubmission ] = useState(null);
    // const todoInputRef = useRef();
    const todoInput = useFormInput();

  const todoReducer = (state, action) => {
    switch(action.type) {
      case 'SET':
        return action.payload;
      case 'ADD':
        return state.concat(action.payload);
      case 'REMOVE':
        return state.filter(e => e.id !== action.payload);
      default: return state;
    }
  }

  const [ todoList, dispatch ] = useReducer(todoReducer, []);

  useEffect(() => {
    axios.get('https://react-hooks-demo-4a91c.firebaseio.com/todos.json')
      .then(res => {
        const todos = Object.entries(res.data).map(e => ({ id: e[0], name: e[1].name }));
        dispatch({ type: 'SET', payload: todos });
      });
  }, []);

  // useEffect(() => {
  //   if(submission) dispatch({ type: 'ADD', payload: submission });
  // }, [ submission ])

 
  const todoAddHandler = () => {
    const input = todoInput.value;
    axios.post('https://react-hooks-demo-4a91c.firebaseio.com/todos.json', { name: input })
      .then(res => {
        const newItem = { id: res.data.name, name: input };
        dispatch({ type: 'ADD', payload: newItem });
      })
      .catch(console.log);
    // setInput('');
  };

  const todoRemoveHandler = id => {
    axios.delete(`https://react-hooks-demo-4a91c.firebaseio.com/todos/${id}.json`)
      .then(res => dispatch({ type: 'REMOVE', payload: id }))
      .catch(console.log);
  }

  // const inputValidationHandler = evt => setInputValidity(!!evt.target.value.trim().length);

  return (
    <div>
      <>
        <input type="text"
          placeholder="Todo"
          onCHange={todoInput.onChange}
          value={todoInput.value}
          style={{ backgroundColor: todoInput.validity ? 'transparent' : 'red'}}
        />
        <button
          type="button"
          onClick={todoAddHandler}
        >Add</button>
        {useMemo(() => <List items={todoList} remove={todoRemoveHandler} />, [ todoList ])}
      </>
    </div>
  );
};
