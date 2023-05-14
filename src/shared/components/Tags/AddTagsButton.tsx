import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Box, TextField} from '@mui/material';
import {userTags} from '@pages/authorization/store';
import ActionButton from '@shared/components/ActionButton';
import useAnchorElement from '@shared/hooks/useAnchorElement';
import DropdownMenu from '@shared/components/dropdownMenu';
import TagsList from '@shared/components/Tags/TagsList';
import NoTagsComponent from '@shared/components/Tags/noTagsComponent';

import './TagsStyles.css'

interface Props {
  todoTags: string[],
  onAddNewLabel: (newLabel: string) => void
}

const AddTagsButton = ({todoTags, onAddNewLabel}: Props) => {
  const [anchorEl, addAnchorEl] = useAnchorElement(null);
  const [search, setSearch] = useState('');
  const tags = useSelector(userTags)

  const filteredTags = tags.filter((item: string) => item.includes(search));

  const onOpenDropdown = (e: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(e.currentTarget)
  }

  const onCloseDropdown = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    addAnchorEl(null)
  }

  return (
    <ActionButton onClickHandler={onOpenDropdown}>
      <Box>
        Add Label
      </Box>

      <DropdownMenu anchorEl={anchorEl} handleClose={onCloseDropdown}>
        <Box>
          <TextField
            sx={{padding: '0px'}}
            placeholder={'Type a label'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            inputProps={{autoComplete: 'off'}}
          />
          <Box width={'100%'} maxHeight={'150px'}>
            {
                filteredTags.length > 0 ?
                    <TagsList tags={filteredTags}
                      todoCurrentTags={todoTags}
                      onSelect={onAddNewLabel}/>:
                    search ? <NoTagsComponent search={search}/> : null
            }
          </Box>
        </Box>
      </DropdownMenu>

    </ActionButton>
  );
};

export default AddTagsButton;
