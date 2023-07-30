import React from 'react';
import DropdownMenu from '@shared/components/dropdownMenu';
import {Box, MenuItem, Tooltip, Typography} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useAnchorElement} from '@shared/hooks';
import {orderSelector, setSortingValue, sortTypeSelector, toggleOrder} from '@app/store/AppStore';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const sortOptions = [
  {value: 'default', label: 'Default'},
  {value: 'name', label: 'Name'},
  {value: 'date', label: 'Due date'},
  {value: 'priority', label: 'Priority'},
  {value: 'completed', label: 'Completed'},
]

const SortingMenu = () => {
  const [anchorEl, setAnchorEl, removeAnchorEl] = useAnchorElement(null)
  const dispatch = useDispatch()
  const currentSortingType = useSelector(sortTypeSelector)
  const order = useSelector(orderSelector)

  const onOptionSelect = (newValue: string) => {
    localStorage.setItem('sorting', newValue)
    dispatch(setSortingValue(newValue))
    removeAnchorEl()
  }

  const updateOrder = (newOrder: 'descending' | 'ascending') => {
    dispatch(toggleOrder(newOrder))
    localStorage.setItem('ordering', newOrder)
  }

  const toggleOrdering = () => {
    if (order === 'ascending') {
      updateOrder('descending')
    } else if (order === 'descending') {
      updateOrder('ascending')
    }
  }

  const showDefaultIcon = currentSortingType === 'default'
  return (
    <>

      {
        showDefaultIcon ? (
            <Tooltip title={'sort'}>
              <CustomIconButton onClick={(e) => setAnchorEl(e.target as HTMLElement)}>
                <FilterAltIcon sx={{color: '#808080', fontSize: '20px'}}/>
              </CustomIconButton>
            </Tooltip>
        ) : (
            <Box ml={'10px'}>
              <Tooltip title={'Reverse order'}>
                <CustomIconButton onClick={toggleOrdering}>
                  {
                    order === 'descending' ? (
                        <NorthIcon sx={{fontSize: '18px', color: '#808080'}}/>
                    ) : (
                        <SouthIcon sx={{fontSize: '18px', color: '#808080'}}/>
                    )
                  }
                </CustomIconButton>
              </Tooltip>
              <CustomIconButton onClick={(e) => setAnchorEl(e.target as HTMLElement)}>
                <Box sx={onSortButtonStyles}>
                  Sorted by {currentSortingType}
                </Box>
              </CustomIconButton>
              <Tooltip title={'Reset sorting'}>
                <CustomIconButton onClick={() => onOptionSelect('default')}>
                  <CloseIcon sx={{fontSize: '18px', color: '#808080'}}/>
                </CustomIconButton>
              </Tooltip>
            </Box>
        )
      }

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
  'fontSize': '12px',
  'color': '#808080',
  'fontWeight': 700,
  'padding': '0 5px',
  '&:hover': {
    color: '#202020',
  },
  'fontFamily': '-apple-system,BlinkMacSystemFont, "Segoe UI",Roboto,"Apple Color Emoji",' +
      'Helvetica,Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol"',
}


export default SortingMenu;
