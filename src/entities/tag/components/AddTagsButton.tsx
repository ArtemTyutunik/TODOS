import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Box, TextField} from '@mui/material';
import {errorDuringFetchSelector, userTagsSelector} from '@entities/tag/store/tagStore';
import ActionButton from '@shared/components/ActionButton';
import {useAnchorElement} from '@shared/hooks';
import DropdownMenu from '@shared/components/dropdownMenu';
import TagsList from '@entities/tag/components/TagsList';
import {NoTagsComponent} from '@entities/tag';

import '@entities/tag/components/TagsStyles.css'
import {ITag, tagIdType} from '@shared/interfacesAndTypes';
import ErrorComponent from '@entities/tag/components/ErrorComponent';

interface Props {
  todoTags: tagIdType[],
  onAddNewLabel: (newLabel: string) => void
}

const AddTagsButton = ({todoTags, onAddNewLabel}: Props) => {
  const [anchorEl, addAnchorEl] = useAnchorElement(null);
  const [search, setSearch] = useState('');
  const tags: ITag[] = useSelector(userTagsSelector)
  const errorFetching = useSelector(errorDuringFetchSelector)

  const filteredTags = tags.filter((item: ITag) => item.name.includes(search));

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
        Tags
      </Box>

      <DropdownMenu anchorEl={anchorEl} handleClose={onCloseDropdown}>
        <Box>
          <TextField
            sx={{padding: '0px'}}
            placeholder={'Search tag'}
            className={'tag-selector-input'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id={'tagsInputInner'}
            inputProps={{autoComplete: 'off', id: 'tagsInput'}}
          />
          <Box width={'100%'} maxHeight={'150px'}>
            {
              filteredTags.length > 0 ?
                  <TagsList tags={filteredTags}
                    todoCurrentTags={todoTags}
                    onSelect={onAddNewLabel}/> :
                  search ? <NoTagsComponent search={search}/> : null
            }

            {
              errorFetching && <ErrorComponent/>
            }
          </Box>
        </Box>
      </DropdownMenu>

    </ActionButton>
  );
};

export default AddTagsButton;
