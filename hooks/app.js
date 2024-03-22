import { useDispatch, useSelector } from 'react-redux';
import { appIsLoading } from '../store/app';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export const useLoading = () => {
  const reduxDispath = useDispatch();
  const { isLoading } = useSelector(({ app }) => app);

  const doLoad = (isLoading = !isLoading) => {
    reduxDispath(appIsLoading(isLoading));
  };

  return {
    doLoad,
    isLoading,
  };
};

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (message, options = {}) => {
    enqueueSnackbar(message, options);
  };

  const onSuccess = (message, options = {}) => {
    enqueueSnackbar(message, { ...options, variant: 'success' });
  };

  const onError = (message, options = {}) => {
    enqueueSnackbar(message, { ...options, variant: 'error' });
  };

  return {
    notify,
    onSuccess,
    onError,
  };
};

export const useDebounce = () => {
  const [debouncedId, setDebouncedId] = useState(null);

  const debounce = (callback, timeout = 400) => {
    if (debouncedId) {
      clearTimeout(debouncedId);
    }

    const newDebouncedId = setTimeout(callback, timeout);

    setDebouncedId(newDebouncedId);

    return newDebouncedId;
  };

  useEffect(() => {
    return () => {
      if (debouncedId) {
        clearTimeout(debouncedId);
      }
    };
  }, []);

  return {
    debouncedId,
    debounce,
  };
};

