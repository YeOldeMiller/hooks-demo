import React from 'react';

export default function List({ items, remove }) {
  console.log('Rendering list');
  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          onClick={() => remove(item.id)}
        >{item.name}
        </li>))}
    </ul>
  );
};
