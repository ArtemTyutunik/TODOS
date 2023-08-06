import {useEffect, useRef} from 'react';

const useResizable = (direction: 'left' | 'right',
    minWidth: number | undefined = 200,
    maxWidth: number | undefined = 400,
    localStorageItem: string) => {
  const resizerElement = useRef<HTMLDivElement | null>(null)
  const resizableElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    resizerElement.current = document.querySelector('.resizer-' + direction);
    resizableElement.current = document.querySelector('.resizable-' + direction);

    function initResizerFn(resizer: HTMLDivElement, resizable: HTMLDivElement) {
      // track current mouse position in x var
      let userX: number;
      let resizableBlockWidth: number;

      function mousedownHandler(e: MouseEvent) {
        userX = e.clientX;
        resizableBlockWidth = parseInt(window.getComputedStyle(resizable).width, 10);

        document.addEventListener('mousemove', mousemoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
      }

      function mousemoveHandler(e: MouseEvent) {
        const diff = direction === 'right' ? e.clientX - userX : userX - e.clientX
        const newWidth = resizableBlockWidth + diff; // complete width

        if (newWidth < maxWidth && newWidth > minWidth) {
          resizable.style.width = `${newWidth}px`;
        }
      }

      function mouseupHandler() {
        if (resizableElement.current) {
          localStorage.setItem(localStorageItem, resizableElement.current.style.width);
        }
        // remove event mousemove && mouseup
        document.removeEventListener('mouseup', mouseupHandler);
        document.removeEventListener('mousemove', mousemoveHandler);
      }

      resizer.addEventListener('mousedown', mousedownHandler);
    }

    if (resizerElement.current && resizableElement.current) {
      initResizerFn(resizerElement.current, resizableElement.current);
    }
  }, [])
}

export default useResizable;
