import React from 'react';
import {Box, FormControlLabel, SelectChangeEvent, TextField, Typography} from '@mui/material';
import {inputSectionStyle} from '@pages/todos/pages/FiltersAndTagsPage/components/tags/componentsStyles';
import ColorTagSelect from '@pages/todos/pages/FiltersAndTagsPage/components/tags/ColorTagSelect';
import {SwitchComponent} from '@shared/components/SwitchComponent';
import {colorType, ITag} from '@shared/interfacesAndTypes';


interface Props {
    onSelectChange(e: SelectChangeEvent, colors: colorType[]): void,
    onInputChange(e: React.ChangeEvent<HTMLInputElement>): void,
    isError: boolean,
    tagState: ITag,
    toggleIsFavorite(): void,
    isChecked: boolean
}

const TagInfoModalForm = ({
  onSelectChange,
  onInputChange,
  isError,
  tagState,
  toggleIsFavorite,
  isChecked}: Props) => {
  return (
    <Box minWidth={{laptop: '500px', largeMobile: '300px'}} sx={(theme) => ({color: theme.text.title})}>
      <Box padding={'10px 15px'}>
        <Typography fontSize={'19px'} fontWeight={600}>
                    Add tag
        </Typography>
      </Box>
      <Box sx={inputSectionStyle(isError)}>
        <Box mb={'15px'}>
          <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
                        Tag name
          </Typography>
          <TextField onChange={onInputChange}
            value={tagState.name}
            error={isError}
            helperText={'Tag with the same name already exists'}
            variant={'outlined'}
            className={'create-tag-input'}
            inputProps={{autoFocus: true}}/>
        </Box>
        <Box marginBottom={'15px'}>
          <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
                        Tag color
          </Typography>
          <ColorTagSelect settings={tagState.settings} onSelectChange={onSelectChange}/>
        </Box>
        <FormControlLabel control={<SwitchComponent checked={isChecked}
          onChange={toggleIsFavorite}/>}
        label={'Add to favorites'}
        sx={{color: '#202020', fontSize: '14px', width: 'fit-content', margin: '0'}}/>
      </Box>
    </Box>

  );
};

export default TagInfoModalForm;
