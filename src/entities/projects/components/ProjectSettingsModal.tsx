import React, {ChangeEvent, useState} from 'react';
import {Box, SelectChangeEvent, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {InputsSection, ModalWrapper, NameInput} from '@shared/components/SettingModal';
import ColorTagSelect from '@shared/components/SettingModal/ColorTagSelect';
import BasicModal from '@shared/components/modal';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import useProjectState, {setColorAction, setProjectNameAction} from '@entities/projects/hooks/useProjectReducer';
import {colorType, IProject} from '@shared/interfacesAndTypes';
import {addNewProject} from '@entities/projects/model/store';
import {itemAlreadyExist} from '@shared/helpers';
import {addProjectToUserData} from '@shared/api/services/projects';
import {userIdSelector} from '@entities/user/model/store';

interface Props {
    isOpen: boolean,
    onClose: () => void,
  projects: IProject[]
}
const ProjectSettingsModal = ({isOpen, onClose, projects}: Props) => {
  const [project, projectDispatcher] = useProjectState()
  const [invalidData, setInvalidData] = useState(false)
  const userId = useSelector(userIdSelector)
  const dispatch = useDispatch();

  const onInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    projectDispatcher(setProjectNameAction(value))
    setInvalidData(itemAlreadyExist<IProject>(projects, value, project))
  }

  const onColorSelect = (e: SelectChangeEvent, colors: colorType[]) => {
    const chosenColor = colors.find((color) => color.name === e.target.value)
    if (chosenColor) {
      projectDispatcher(setColorAction(chosenColor))
    }
  }

  const CreateNewProject = async () => {
    try {
      await addProjectToUserData(project, userId)
      dispatch(addNewProject(project))
      onClose()
    } catch (e) {
      console.log(e)
    }
  }

  const isValid = project.name.trim().length > 0;

  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <ModalWrapper>
        <Box padding={'10px 15px'}>
          <Typography fontSize={'19px'} fontWeight={600}>
                      Add Project
          </Typography>
        </Box>
        <InputsSection isError={invalidData}>
          <NameInput isError={false} inputValue={project.name} onChange={onInputNameChange}/>
          <Box marginBottom={'15px'}>
            <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
                          Tag color
            </Typography>

            <ColorTagSelect settings={project.color} onSelectChange={onColorSelect}/>
          </Box>
        </InputsSection>

        <Box margin={'10px 0'} paddingRight={'15px'}>
          <FormSubmissionButtons onClose={onClose}
            isValid={!invalidData && isValid}
            onSubmit={CreateNewProject}/>
        </Box>
      </ModalWrapper>
    </BasicModal>

  );
};

export default ProjectSettingsModal;
