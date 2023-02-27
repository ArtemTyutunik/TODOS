import React from 'react';

import {Checkbox} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {ITodo} from '@shared/interfaces';


const CheckboxComponent = ({onComplete, todo} : { onComplete: (e: React.SyntheticEvent) => void, todo: ITodo}) => {
  const {priority = '4', done} = todo
  const switchColorCheckBox = (priority: string) : string => {
    switch (priority) {
      case '1': return '#cc2a25';
      case '2': return '#ff824d';
      case '3': return '#1531d1';
      case '4': return '#babbc2';
      default: return '#babbc2';
    }
  };

  const checkBoxColorStyle = {
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
