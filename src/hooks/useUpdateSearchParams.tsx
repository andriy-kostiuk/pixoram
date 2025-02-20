import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UpdateSearchParamsFn {
  (key: string, value: string | number | null | undefined): void;
}

export const useUpdateSearchParams = (): [
  URLSearchParams,
  UpdateSearchParamsFn
] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (key: string, value: string | number | null | undefined) => {
      const params = new URLSearchParams(searchParams);

      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return [searchParams, updateSearchParams];
};
