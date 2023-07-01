import React from 'react';
import {Box, FormControlLabel, SelectChangeEvent, Typography} from '@mui/material';
import ColorTagSelect from '@shared/components/SettingModal/ColorTagSelect';
import {SwitchComponent} from '@shared/components/SwitchComponent';
import {colorType, ITag} from '@shared/interfacesAndTypes';
import {ModalWrapper, NameInput, InputsSection} from '@shared/components/SettingModal';

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
    <ModalWrapper>
      <Box padding={'10px 15px'}>
        <Typography fontSize={'19px'} fontWeight={600}>
           Add tag
        </Typography>
      </Box>
      <InputsSection isError={isError}>
        <NameInput isError={isError} onChange={onInputChange} inputValue={tagState.name}/>
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
      </InputsSection>
    </ModalWrapper>

  );
};

export default TagInfoModalForm;
