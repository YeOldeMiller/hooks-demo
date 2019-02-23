import { useState } from 'react';

export const useFormInput = () => {
  const [ value, setValue ] = useState(''),
    [ validity, setValidity ] = useState(false),
    inputChangeHandler = evt => {
      setValue(evt.target.value);
      setValidity(!!evt.target.value.trim().length);
    }

   return { value, onChange: inputChangeHandler, validity }
}