import React from 'react';

import {Checkbox, useTheme} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {ITodo} from '@shared/interfacesAndTypes';


const CheckboxComponent = ({onComplete, todo} : { onComplete: (e: React.SyntheticEvent) => void, todo: ITodo}) => {
  const theme = useTheme()
  const {priority = '4', done} = todo
  const switchColorCheckBox = (priority: string) : string => {
    switch (priority) {
      case '1': return theme.priority.first;
      case '2': return theme.priority.second;
      case '3': return theme.priority.third;
      case '4': return theme.priority.fourth;
      default: return theme.priority.fourth;
    }
  };

  const checkBoxColorStyle = {
    fontSize: '18px',
    color: switchColorCheckBox(priority),
  };

  return (
    <Checkbox icon={<RadioButtonUncheckedIcon sx = {checkBoxColorStyle}/>}
      checkedIcon={<CheckCircleOutlineIcon sx = {checkBoxColorStyle}/>}
      onClick={onComplete}
      checked={done}/>
  );
};

export default CheckboxComponent;
