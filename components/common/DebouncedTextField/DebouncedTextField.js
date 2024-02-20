import { useState } from 'react';
import { useDebounce } from '../../../hooks/app';
import { TextField } from '@mui/material';

const DebouncedTextField = ({ onChange, ...props }) => {
  const [value, setValue] = useState('');

  const { debounce } = useDebounce();

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debounce(() => onChange(e.target.value), 500);
      }}
    />
  );
};

export default DebouncedTextField;
