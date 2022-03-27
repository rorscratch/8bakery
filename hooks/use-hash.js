import React from "react";

export function useHash () {
  const [hash, setHash] = React.useState("");

  const hashChangeHandler = React.useCallback(() => {
    setHash(window.location.hash);
  }, []);

  React.useEffect(() => {
    setHash(window.location.hash);
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, []);

  const updateHash = React.useCallback(
    newHash => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash]
  );

  return [hash, updateHash];
};