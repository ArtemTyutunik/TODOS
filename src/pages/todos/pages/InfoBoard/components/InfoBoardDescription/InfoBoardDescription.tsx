import React, {useEffect, useRef} from 'react';
import {Box, Typography} from '@mui/material';
import TodoDescriptionInput from '@shared/forms/ui/TodoDescriptionInput';
import {styled} from '@mui/material/styles';
import theme from '@app/theme';
import {ITodo} from '@shared/interfacesAndTypes';

interface Props {
    initValue: string;
    onTodoUpdate: (updatedTodoValues: Partial<ITodo>) => void;
}

const InfoBoardDescription = ({initValue, onTodoUpdate}: Props) => {
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
        descriptionInputRef.current!.value = initValue
  }, [initValue])

  const onTodoUpdateDescription = () => {
    if (descriptionInputRef.current) {
      onTodoUpdate({description: descriptionInputRef.current.value});
    }
  }

  return (
    <DescriptionWrapper ml={'10px'} fontSize={'14px'} color={'#202020'} >
      <Typography fontSize={'inherit'} fontWeight={600} fontFamily={theme.typography.fontFamily} mb={'5px'}>
              Description
      </Typography>
      <TodoDescriptionInput value={initValue}
        ref={descriptionInputRef}
        onBlur={onTodoUpdateDescription}/>
    </DescriptionWrapper>
  );
};


const DescriptionWrapper = styled(Box)(() => ({
  '& textarea': {
    'borderRadius': '5px',
    'padding': '8px',
    'transform': 'translateX(-8px)',
    '&: hover': {
      backgroundColor: `rgb(235, 236, 240)`,
    },
    '&: focus': {
      backgroundColor: `#fff`,
    },
  },
}))


export default InfoBoardDescription;
