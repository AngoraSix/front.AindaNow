import { useDispatch, useSelector } from 'react-redux';
import { appIsLoading } from '../store/app';
import { useSnackbar } from 'notistack';
import { useRef, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';

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

export const useDebounce = (callback) => {
  // https://www.developerway.com/posts/debouncing-in-react
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 500);
  }, []);

  return debouncedCallback;
};
