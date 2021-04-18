import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string, defaultMatches = window.matchMedia(query).matches): boolean => {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
};
