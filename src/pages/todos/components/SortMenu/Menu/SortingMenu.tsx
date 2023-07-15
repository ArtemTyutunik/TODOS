import React from 'react';
import DropdownMenu from '@shared/components/dropdownMenu';
import {Box, MenuItem, Tooltip, Typography} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useAnchorElement} from '@shared/hooks';
import {setSortingValue, sortTypeSelector} from '@app/store/AppStore';
import {useDispatch, useSelector} from 'react-redux';

const SortingMenu = () => {
  const [anchorEl, setAnchorEl, removeAnchorEl] = useAnchorElement(null)
  const dispatch = useDispatch()
  const currentSortingType = useSelector(sortTypeSelector)

  const onOptionSelect = (newValue: string) => {
    localStorage.setItem('sorting', newValue)
    dispatch(setSortingValue(newValue))
    removeAnchorEl()
  }

  return (
    <>
      <CustomIconButton onClick={(e) => setAnchorEl(e.target as HTMLElement)}>
        {currentSortingType !== 'default' ? (
            <Box sx={onSortButtonStyles}>
              Sorted by {currentSortingType}
            </Box>
            ) : (
            <Tooltip title={'sort'}>
              <FilterAltIcon sx={{color: '#808080', fontSize: '20px'}}/>
            </Tooltip>
        )

        }

      </CustomIconButton>
      <DropdownMenu anchorEl={anchorEl} handleClose={removeAnchorEl}>
        {
          sortOptions.map(({value, label}) => <MenuItem key={value}
            onClick={() => onOptionSelect(value)}
            sx={menuItemStyles}>
            <Typography fontSize={'14px'} color={'#202020'} mr={'20px'}>
              {label}
            </Typography>
            {currentSortingType === value && <CheckIcon sx={selectIconsStyles}/>}
          </MenuItem>)
        }
      </DropdownMenu>
    </>

  );
}

const menuItemStyles = {
  position: 'relative',
  padding: '5px 55px 5px 10px',
  minWidth: '100px',
  fontSize: '16px',
  color: '#202020',
}

const selectIconsStyles = {
  position: 'absolute',
  right: '0',
  marginRight: '10px',
  top: '25%',
  color: '#808080',
  fontSize: '18px',
}

const onSortButtonStyles = {
  'fontSize': '15px',
  'color': '#808080',
  'fontWeight': 500,
  'padding': '0 10px',
  '&:hover': {
    color: '#202020',
  },
}


const sortOptions = [
  {value: 'default', label: 'Default'},
  {value: 'name', label: 'Name'},
  {value: 'date', label: 'Due date'},
  {value: 'priority', label: 'Priority'},
]

export default SortingMenu;
