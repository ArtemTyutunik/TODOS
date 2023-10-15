import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import {useLocalStorage} from '@shared/hooks';
import CustomIconButton from '@shared/components/CustomIconButton';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalProps{
  opened: boolean,
  close: () => void,
  confirmComplete: (isComplete?: boolean) => void
}

const ModalWindow = ({opened, close, confirmComplete}:ModalProps) => {
  const [, setRemoveIsCurrentStatus] = useLocalStorage('removeIsCurrentStatus', true)
  const [askToDeleteCurrentStatus, setAskToDeleteCurrentStatus] = useLocalStorage('askToDeleteCurrentStatus', true)

  const rememberChoice = () => {
    setAskToDeleteCurrentStatus(!askToDeleteCurrentStatus)
  }

  const changeCurrent = (current: boolean) => {
    setRemoveIsCurrentStatus(current)
    confirmComplete(!current)
    close()
  }

  return <Modal
    open={opened}
    onClose={close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        You are going to complete the current task. Do you want do remove this status?
      </Typography>
      <FormSubmissionButtons isValid={true} onClose={() => changeCurrent(false)} onSubmit={() => changeCurrent(true)} />
      <FormGroup>
        <FormControlLabel control={<Checkbox />} onChange={rememberChoice} label="Remember the choice"/>
      </FormGroup>
    </Box>
  </Modal>;
}

export default ModalWindow
