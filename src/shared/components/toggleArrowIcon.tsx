import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {IconButton, SxProps, Theme} from '@mui/material';
import {styled} from '@mui/material/styles';


const CustomArrowButton = styled(IconButton)(() => ({
  'padding': '4px',
  'borderRadius': '4px',
  'fontSize': '14px',

  '&.rotated': {
    transform: 'rotate(90deg)',
  },
}))

interface Props {
  isExpanded: boolean,
  onClick: () => void
  sx?: SxProps<Theme>
}

const ToggleArrowButton = ({isExpanded, onClick, sx}: Props) => {
  return (
    <CustomArrowButton sx={sx}
      className={isExpanded ? 'rotated': ''}
      onClick={onClick}>
      <ArrowForwardIosIcon sx={{fontSize: 'inherit'}}/>
    </CustomArrowButton>
  );
};

export default ToggleArrowButton;
