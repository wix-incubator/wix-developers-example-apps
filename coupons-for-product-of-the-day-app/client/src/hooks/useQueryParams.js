import { useMemo } from 'react';

export function useQueryParams() {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  return searchParams;
}
