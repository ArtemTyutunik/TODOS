import React from 'react';
import {SelectChangeEvent} from '@mui/material';
import {Priority} from '@shared/interfacesAndTypes';
import PrioritySelect from '@shared/components/Priority/PrioritySelector';
import ActionButton from '@shared/components/ActionButton';
import './PriorityStyles.css'

interface Props {
  initialPriority?: Priority | string,
  changeHandler: (event: SelectChangeEvent<Priority>) => void,
  variant?: 'short' | 'standard'
}
const PriorityButton = ({initialPriority = '4', changeHandler, variant}: Props) => {
  return (
      variant === 'standard' ? (
        <ActionButton>
          <PrioritySelect initialPriority={initialPriority} changeHandler={changeHandler}/>
        </ActionButton>
      ) : (
            <PrioritySelect initialPriority={initialPriority} changeHandler={changeHandler}/>
      )
  );
};

export default PriorityButton;
