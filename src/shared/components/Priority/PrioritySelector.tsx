import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Theme, Typography, useTheme} from '@mui/material';
import {Priority} from '@shared/interfaces';
import {PrioritiesFlags} from '@shared/components/PrioritiesFlags';

const FormStyles = (theme: Theme) => ({
  'width': '100%',
  'margin': '0 5px',
  'border': 'none',
  '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: 0,
  },
  '.css-qiwgdb': {
    padding: '0 !important',
  },
  '.css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
    display: 'none',
  },
  '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '.css-bpeome-MuiSvgIcon-root-MuiSelect-icon': {
    display: 'none',
  },
  '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    'padding': 0,
    'fontSize': '12px',
    'color': theme.text.main,
  },
  '.css-1636szt': {
    display: 'none !important',
  },
  '.css-igs3ac': {
    border: 'none',
  },
  '.css-1fu6acg': {
    marginBottom: '-3px',
  },

})


interface Props {
    initialPriority?: Priority | string,
    changeHandler: (event: SelectChangeEvent<Priority>) => void,
}

const PrioritySelect = ({initialPriority, changeHandler}: Props) => {
  const theme = useTheme()
  return (
    <FormControl sx={FormStyles}>
      <Select
        // @ts-ignore
        value={initialPriority}
        displayEmpty
        inputProps={{'aria-label': 'Without label'}}
        onChange={changeHandler}>
        {
          PrioritiesFlags.map((Priority) => <MenuItem value={Priority.value} key={Priority.value} sx={{display: 'flex'}}>
            <Box display={'flex'} alignItems={'center'}>
              <Priority.Icon/>
              <Typography color={theme.text.main} fontSize={'12px'} fontWeight={400} ml={'15px'}>
                {`Priority ${Priority.value}`}
              </Typography>
            </Box>
          </MenuItem>)
        }
      </Select>
    </FormControl>
  );
};

export default PrioritySelect;
