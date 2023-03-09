import React from 'react';
import DropdownMenu from '@shared/components/dropdownMenu';
import {Box, Divider, Typography} from '@mui/material';
import Calendar from './Calendar';
import DueDateMenuList from './DueDateMenu';
import {IDate} from '@shared/interfaces';
import {TodoDescriptionStyles, TodoFlexboxStyles} from '@entities/todos/styles';
import EventIcon from '@mui/icons-material/Event';
import {overdueDate} from '@shared/constants';
import ActionButton from '@shared/components/ActionButton';
import useAnchorElement from '@shared/hooks/useAnchorElement';

type DueDateButtonType = 'Standard' | 'Outline';

interface Props {
    date: IDate | undefined,
    variant?: DueDateButtonType
    onPassDateToBaseForm?: (date: IDate) => void
}

const DueDateButton = ({date, onPassDateToBaseForm, variant = 'Outline'}: Props) => {
  const [anchorElUser, addAnchorEl, removeAnchorEl] = useAnchorElement(null);

  const onSetDate = (date: IDate) => {
    onPassDateToBaseForm && onPassDateToBaseForm(date);
    removeAnchorEl();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(event.currentTarget);
  };

  const isOverdue = overdueDate(date!);
  return (
    <>
      { variant === 'Outline' ? (
          <ActionButton onClickHandler={handleOpenMenu}>
            {
              date || 'Due date'
            }
          </ActionButton>
      ) : (
          <Box sx = {{...TodoFlexboxStyles, cursor: 'pointer'}} mt={'5px'} color={isOverdue ? '#c40202' : '#808080'} onClick={handleOpenMenu}>
            <EventIcon sx={{color: 'inherit', fontSize: '13px'}}/>
            <Typography sx={{...TodoDescriptionStyles, marginLeft: '10px', paddingLeft: 0, fontSize: '13px', color: 'inherit'}}>
              {
                date || 'Due date'
              }
            </Typography>
          </Box>
          )
      }

      <DropdownMenu anchorEl={anchorElUser} handleClose={removeAnchorEl}>
        <Box display={'flex'} flexDirection={'column'} paddingTop={'5px'}>
          <DueDateMenuList onSetDate={onSetDate}/>
          <Divider/>
          <Calendar onSetDate={onSetDate} initialDate={date}/>
        </Box>
      </DropdownMenu>
    </>
  );
};

export default DueDateButton;
