import React, {useState} from 'react';
import {Box, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import {colors, colorType} from '@shared/constants/colors';


const selectStyles = {
  'position': 'relative',
  'zIndex': 1,
  'maxHeight': '250px',

  '& fieldset': {
    border: '1px solid #ddd !important',
  },
  '& .MuiSelect-select': {
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
  },
}

const MenuStyles = {
  '& .MuiPopover-paper': {
    maxHeight: '250px',
    marginTop: '10px',
  },
}
const ColorTagSelect = () => {
  const [selectValue, setSelectValue] = useState(colors[0].name);
  console.log(selectValue);
  return (
    <Select className={'create-tag-input'}
      value={selectValue}
      onChange={(e: SelectChangeEvent) => setSelectValue(e.target.value as string)}
      sx={selectStyles}
      MenuProps={{sx: MenuStyles}}>
      {
        colors.map((color) => <MenuItem sx={{display: 'flex', alignItems: 'center'}}
          value={color.name}
          key={color.name}>
          <SelectItem color={color}/>
        </MenuItem> )
      }
    </Select>
  );
};


function SelectItem({color}: {color: colorType}) {
  return <>
    <Box width={'10px'} height={'10px'} bgcolor={color.colorRGB} borderRadius={'50%'} marginRight={'10px'}></Box>
    <Typography>
      {color.name}
    </Typography>
  </>
}
export default ColorTagSelect;
