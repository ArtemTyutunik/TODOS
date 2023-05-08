import React, {useState} from 'react';
import ActionButton from '@shared/components/ActionButton';
import {Box, TextField} from '@mui/material';
import useAnchorElement from '@shared/hooks/useAnchorElement';
import DropdownMenu from '@shared/components/dropdownMenu';
import TagsList from '@shared/components/AddLabel/TagsList';
import './AddLabelsStyles.css'

interface Props {
  initialLabel: string | undefined,
  onAddNewLabel: (newLabel: string | undefined) => void
}
const AddLabelButton = ({initialLabel, onAddNewLabel}: Props) => {
  const [anchorEl, addAnchorEl] = useAnchorElement(null)
  const [label, setLabel] = useState(initialLabel)

  const onOpenDropdown = (e: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(e.currentTarget)
  }

  const onCloseDropdown = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    addAnchorEl(null)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddNewLabel(label)
    setLabel('')
    addAnchorEl(null)
  }
  return (
    <ActionButton onClickHandler={onOpenDropdown}>
      <Box>
        {initialLabel || 'Add Label'}
      </Box>

      <DropdownMenu anchorEl={anchorEl} handleClose={onCloseDropdown}>
        <Box>
          <form onSubmit={onSubmit}>
            <TextField
              sx={{padding: '0px'}}
              placeholder={'Type a label'}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <TagsList/>
          </form>
        </Box>
      </DropdownMenu>

    </ActionButton>
  );
};

export default AddLabelButton;
