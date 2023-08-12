import React from 'react';
import {Box, useTheme} from '@mui/material';
import {ITodo} from '@shared/interfacesAndTypes';
import InfoBoardTitle from '@pages/todos/pages/InfoBoard/components/InfoBoardTitle';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent) => void
}

const DetailsCard = ({todo}: Props) => {
  const theme = useTheme()
  return (
    <Box bgcolor={theme.background.paper}
      borderRadius={'7px'}>
      <Box display={'flex'}>
        <Box width={'100%'} margin={'10px'} sx={{wordWrap: 'break-word'}} fontWeight={'bold'}>
          <InfoBoardTitle value={todo.label} onTitleChange={() => {}}/>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsCard;
