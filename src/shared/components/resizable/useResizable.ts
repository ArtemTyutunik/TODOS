import {useEffect, useRef} from 'react';

type Direction = 'left' | 'right';
const useResizable = (direction: Direction,
    minWidth: number | undefined = 200,
    maxWidth: number | undefined = 400,
    localStorageItem: string) => {
  //
  const resizerElement = useRef<HTMLDivElement | null>(null)
  const resizableElement = useRef<HTMLDivElement | null>(null)

  const initialClientX = useRef<number>(0)
  const initialWidth = useRef<number>(0)

  useEffect(() => {
    resizerElement.current = document.querySelector('.resizer-' + direction);
    resizableElement.current = document.querySelector('.resizable-' + direction);

    if (resizerElement.current && resizableElement.current) {
      resizerElement.current.addEventListener('mousedown', mousedownHandler);
    }

    return () => {
      resizerElement.current?.removeEventListener('mousedown', mousedownHandler);
      document.removeEventListener('mouseup', mouseupHandler);
      document.removeEventListener('mousemove', mousemoveHandler);
    }
  }, [])


  const mousedownHandler = (e: MouseEvent) => {
    initialClientX.current = e.clientX;
    const resizable = resizableElement.current;

    if (resizable) {
      initialWidth.current = parseInt(window.getComputedStyle(resizable).width, 10);

      document.addEventListener('mousemove', mousemoveHandler);
      document.addEventListener('mouseup', mouseupHandler);
    }
  }

  const mousemoveHandler = (e: MouseEvent) => {
    const clientX = initialClientX.current
    const newClientX = e.clientX;
    if (resizableElement.current && clientX) {
      const diff = direction === 'right' ? newClientX - clientX : clientX - newClientX

      const newWidth = initialWidth.current! + diff;
      if (newWidth < maxWidth && newWidth > minWidth) {
        resizableElement.current.style.width = `${newWidth}px`;
      }
    }
  }


  const mouseupHandler = () => {
    if (resizableElement.current) {
      localStorage.setItem(localStorageItem, resizableElement.current.style.width);
    }
    document.removeEventListener('mouseup', mouseupHandler);
    document.removeEventListener('mousemove', mousemoveHandler);
  }
}


export default useResizable;
