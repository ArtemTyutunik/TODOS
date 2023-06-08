import {Box, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import {colors} from '@shared/constants/colors';
import {colorType} from '@shared/interfacesAndTypes';
import {MenuStyles, selectStyles} from './componentsStyles';

interface Props {
  settings: colorType,
  onSelectChange: (e: SelectChangeEvent, color: colorType[]) => void
}

const ColorTagSelect = ({settings, onSelectChange}: Props) => {
  return (
    <Select className={'create-tag-input'}
      value={settings.name}
      onChange={(event: SelectChangeEvent) => onSelectChange(event, colors)}
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
    <Box width={'10px'} height={'10px'} bgcolor={color.background} borderRadius={'50%'} marginRight={'10px'}></Box>
    <Typography>
      {color.name}
    </Typography>
  </>
}
export default ColorTagSelect;
