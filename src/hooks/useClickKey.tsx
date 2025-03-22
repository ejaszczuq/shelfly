import { useCallback, useEffect } from "react";

type KeyName = "Escape" | "Enter" | string;
const KEY_EVENT_TYPE = "keyup";

const useClickKey = (keyName: KeyName, action: () => void) => {
  const handleClickKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === keyName) {
        event.preventDefault();
        action();
      }
    },
    [action]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleClickKey);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleClickKey);
    };
  }, [handleClickKey]);
};

export default useClickKey;
