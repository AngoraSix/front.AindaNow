import { useState } from 'react';
import { useDebounce } from '../../../hooks/app';
import { TextField } from '@mui/material';

const DebouncedTextField = ({ onChange, ...props }) => {
  const [value, setValue] = useState('');

  const debouncedOnChange = useDebounce(() => onChange(value), 500);

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        debouncedOnChange();
        setValue(e.target.value);
      }}
    />
  );
};

export default DebouncedTextField;
