import {useState} from 'react';
import {useSelector} from 'react-redux';
import {projectsSelector} from '@entities/projects/model/store';
import {MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import {CircleIcon, InboxIcon} from '@shared/components/icons';

interface ProjectSelectProps {
    initialProjectId?: string,
    onChange: (id: string) => void
}

const ProjectSelect = ({initialProjectId, onChange}: ProjectSelectProps) => {
  const inboxID = localStorage.getItem('inboxID')
  if (!inboxID) return null
  const [currentProject, setCurrentProject] = useState(initialProjectId || inboxID)
  const projects = useSelector(projectsSelector)

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    setCurrentProject(value);
    onChange(value)
  };

  return <Select value={currentProject}
    onChange={handleChange}
    className={'project-select'}
    sx={selectStyles}
  >
    <MenuItem value={inboxID} sx={selectItemStyles}>
      <InboxIcon sx={(theme) => ({color: theme.background.inboxIcon, fontSize: '17px'})}/>
      <Typography ml={'10px'} fontSize={'13px'} color={'#202020'}>
                Inbox
      </Typography>
    </MenuItem>
    {
      projects.map((project) => <MenuItem key={project.id} value={project.id}>
        <CircleIcon sx={{fontSize: '12px', color: project.color.background}}/>
        <Typography ml={'10px'} fontSize={'13px'} color={'#202020'}>
          {project.name}
        </Typography>
      </MenuItem>)
    }
  </Select>
}

const selectStyles = {
  '& .MuiSelect-select': {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    border: 'none',
  },
  '& fieldset': {
    border: 'none',
  },
}

const selectItemStyles = {
  display: 'flex',
  padding: '0px 15px',
  alignItems: 'center',
}


export default ProjectSelect
