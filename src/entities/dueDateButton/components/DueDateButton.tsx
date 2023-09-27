import React from 'react';
import DropdownMenu from '@shared/components/dropdownMenu';
import {Box, Divider, Typography} from '@mui/material';
import Calendar from '@entities/dueDateButton/components/Calendar';
import DueDateMenuList from '@entities/dueDateButton/components/DueDateMenu';
import {IDate} from '@shared/interfacesAndTypes';
import {todoDescriptionStyles, TodoFlexboxStyles} from '@entities/todos/styles';
import EventIcon from '@mui/icons-material/Event';
import {overdueDate} from '@shared/constants';
import ActionButton from '@shared/components/ActionButton';
import {useAnchorElement} from '@shared/hooks';

type DueDateButtonType = 'Standard' | 'Outline';

interface Props {
    date: IDate | undefined,
    variant?: DueDateButtonType
    onPassDateToBaseForm?: (date: IDate) => void
    disabled?: boolean
}

const DueDateButton = ({date, onPassDateToBaseForm, variant = 'Outline', disabled = false}: Props) => {
  const [anchorElUser, addAnchorEl, removeAnchorEl] = useAnchorElement(null);

  const onSetDate = (date: IDate) => {
    onPassDateToBaseForm && onPassDateToBaseForm(date);
    removeAnchorEl();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    !disabled && addAnchorEl(event.currentTarget);
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
          <Box sx={(theme) => ({...TodoFlexboxStyles,
            cursor: 'pointer',
            color: isOverdue ? theme.text.danger : theme.text.main})}
          onClick={handleOpenMenu}
          mt={'5px'}>
            <EventIcon sx={{color: 'inherit', fontSize: {mobile: '14px', largeMobile: '18px'}}}/>
            <Typography sx={{...todoDescriptionStyles,
              marginLeft: '10px',
              paddingLeft: 0,
              fontSize: '12px',
              color: 'inherit'}}>
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
