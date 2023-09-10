import React, {ChangeEvent, useCallback, useState} from 'react';
import {Box, SelectChangeEvent, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {InputsSection, ModalWrapper, NameInput} from '@shared/components/SettingModal';
import ColorTagSelect from '@shared/components/SettingModal/ColorTagSelect';
import BasicModal from '@shared/components/modal';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import useProjectModalState, {setColorAction, setProjectNameAction} from '@entities/projects/hooks/useProjectReducer';
import {colorType, IProject} from '@shared/interfacesAndTypes';
import {projectsSelector} from '@entities/projects/model/store';
import {itemAlreadyExist} from '@shared/helpers';
import {useNavigate} from 'react-router-dom';
import {AppDispatch} from '@app/store';
import {addNewProjectThunk, editProjectThunk} from '@entities/projects/model/thunks';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    editingMode?: boolean,
    editingProject?: IProject
}

const ProjectSettingsModal = ({isOpen, onClose, editingProject, editingMode = false}: Props) => {
  const projects = useSelector(projectsSelector)
  const [modalState, projectDispatcher] = useProjectModalState(editingProject)
  const [invalidData, setInvalidData] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const onInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    projectDispatcher(setProjectNameAction(value))
    setInvalidData(itemAlreadyExist<IProject>(projects, value, editingProject?.id))
  }

  const onColorSelect = useCallback((e: SelectChangeEvent, colors: colorType[]) => {
    const chosenColor = colors.find((color) => color.name === e.target.value)
    if (chosenColor) {
      projectDispatcher(setColorAction(chosenColor))
    }
  }, [])

  const createNewProject = () => {
    const callback = (id: string) => navigate('/project/' + id)

    dispatch(addNewProjectThunk({project: modalState, callback: callback}))
  }

  const editProject = async () => {
    if (!editingProject) return
    dispatch(editProjectThunk({...editingProject, ...modalState}))
  }

  const isValid = modalState.name.trim().length > 0;

  const onSubmit = () => {
    editingMode ? editProject() : createNewProject()
    onClose()
  }

  const isAllowed = !invalidData && isValid

  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <ModalWrapper>
        <Box padding={'10px 15px'}>
          <Typography fontSize={'19px'} fontWeight={600}>
            {editingMode ? 'Edit' : 'Add'} Project
          </Typography>
        </Box>
        <InputsSection isError={invalidData}>
          <NameInput isError={false}
            inputValue={modalState.name}
            onChange={onInputNameChange}
            onSubmit={isAllowed ? onSubmit : null}/>

          <Box marginBottom={'15px'}>
            <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
              Tag color
            </Typography>

            <ColorTagSelect settings={modalState.color} onSelectChange={onColorSelect}/>
          </Box>
        </InputsSection>
        <Box margin={'10px 0'} paddingRight={'15px'}>
          <FormSubmissionButtons onClose={onClose}
            isValid={isAllowed}
            onSubmit={onSubmit}/>
        </Box>
      </ModalWrapper>
    </BasicModal>

  );
};

export default ProjectSettingsModal;
