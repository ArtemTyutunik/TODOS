import {useContext} from 'react';
import {Box, Divider} from '@mui/material';
import DueDateButton from '@shared/components/DueDateComponents';
import PriorityButton from '@shared/components/Priority/PriorityButton';
import AddLabelButton from '@shared/components/AddLabel/AddLabelButton';
import {useFormContext} from '@shared/forms/hooks/UseBaseFormContext';

interface Props {
    hideActions?: boolean
}
const FormActions = ({hideActions}: Props) => {
  const {todoDate, setTodoDate, priority, setPriority, Label, setLabel} = useFormContext()

  return !hideActions ? (
    <Box display={'flex'} alignItems={'center'}>
      <Box mr={'15px'}>
        <DueDateButton date={todoDate} onPassDateToBaseForm={setTodoDate}/>
      </Box>
      <Box mr={'15px'}>
        <PriorityButton initialPriority={priority} changeHandler={setPriority} variant={'standard'}/>
      </Box>
      <Box>
        <AddLabelButton initialLabel={Label} onAddNewLabel={(newLabel: string | undefined) => setLabel(newLabel)}/>
      </Box>
      <Divider/>
    </Box>
  ) : null
}


export default SetDataPanel;
