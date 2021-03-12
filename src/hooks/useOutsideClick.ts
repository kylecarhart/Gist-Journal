import { RefObject, useEffect } from "react";

/**
 * Listens for a click outside the ref and fires the callback.
 * @param {*} ref - React ref.
 * @param {function} callback
 * @param {boolean} [disabled=false] - Toggle to fire callback.
 */
function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: Function,
  disabled = false
) {
  useEffect(() => {
    const handleClick = (e: Event) => {
      // Does the element contain the area you clicked (and not disabled)?
      if (!ref.current?.contains(e.target as Node) && !disabled) {
        callback(e);
      }
    };

    if (!disabled) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, disabled]);
}

export default useOutsideClick;
