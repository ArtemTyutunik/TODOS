import {useEffect, useRef} from 'react';

const useResizable = (direction: 'left' | 'right',
    minPx: number | undefined = 200,
    maxPx: number | undefined = 400,
    localStorageItem: string) => {
  const resizerElement = useRef<HTMLDivElement | null>(null)
  const resizableElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    resizerElement.current = document.querySelector('.resizer-' + direction);
    resizableElement.current = document.querySelector('.resizable-' + direction);

    function initResizerFn(resizer: HTMLDivElement, resizable: HTMLDivElement) {
      // track current mouse position in x var
      let x: number;
      let w: number;

      function mousedownHandler(e: MouseEvent) {
        x = e.clientX;

        const sbWidth = window.getComputedStyle(resizable).width;
        w = parseInt(sbWidth, 10);

        document.addEventListener('mousemove', mousemoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
      }

      function mousemoveHandler(e: MouseEvent) {
        const dx = direction === 'right' ? e.clientX - x : x - e.clientX
        const cw = w + dx; // complete width

        if (cw < maxPx && cw > minPx) {
          resizable.style.width = `${cw}px`;
          console.log(dx, resizable.style.width, e.clientX, x);
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
