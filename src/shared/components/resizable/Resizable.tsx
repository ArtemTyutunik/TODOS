import React, {memo} from 'react';
import {Box} from '@mui/material';
import useResizable from '@shared/components/resizable/useResizable';

interface Props {
  children: React.ReactNode;
  direction: 'left' | 'right';
  localStorageItem: string;
  minWidth?: number;
  maxWidth?: number;
  width?: string;
}

const Resizable = memo(({children,
  minWidth = 200,
  maxWidth = 400,
  width,
  localStorageItem,
  direction}: Props) => {
  useResizable(direction, minWidth, maxWidth, localStorageItem);
  return (
    <Box sx={ResizerStyles}
      width={width}
      className={'resizable-' + direction}
      data-testid={'resizable'}
    >
      <Box className={'resizer resizer-' + direction}
        sx={resizerStyles(direction)}
        data-testid={'resizer'}
      >
      </Box>
      {children}
    </Box>
  );
});

export default Resizable;

const ResizerStyles = () => ({
  'position': 'relative',
  'height': '100%',
  'backgroundColor': 'transparent',
})

const resizerStyles = (direction: 'left' | 'right') => ({
  'position': 'absolute',
  'top': 0,
  [direction]: 0,
  'width': '2px',
  'zIndex': 2,
  'cursor': 'col-resize',
  'height': '100%',
  'background': 'transparent',
  '&:hover': {
    background: '#6587ff',
  },
})
