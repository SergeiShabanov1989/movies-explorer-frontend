import {useEffect, useState} from "react";

export const useCurrentWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timoutId = null;

    const resizeListener = () => {
      clearTimeout(timoutId);
      timoutId = setTimeout(() => setWidth(window.innerWidth), 150)
    };

    window.addEventListener('resize', resizeListener);

    return(() => {
      window.removeEventListener('resize', resizeListener);
    })
  }, [])

  return width;
}