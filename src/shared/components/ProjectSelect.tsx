import {useState} from 'react';
import {useSelector} from 'react-redux';
import {projectsSelector} from '@entities/projects/model/store';
import {MenuItem, Select, SelectChangeEvent, Theme, Typography} from '@mui/material';
import {CircleIcon, InboxIcon} from '@shared/components/icons';

interface ProjectSelectProps {
    initialProjectId?: string,
    onChange: (id: string) => void
}

const ProjectSelect = ({initialProjectId, onChange}: ProjectSelectProps) => {
  const inboxID = localStorage.getItem('inboxID')
  const [currentProject, setCurrentProject] = useState(initialProjectId || inboxID || '')
  const projects = useSelector(projectsSelector)

  if (!inboxID) return null


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
      <Typography ml={'10px'} fontSize={'13px'}>
                Inbox
      </Typography>
    </MenuItem>
    {
      projects.map((project) => <MenuItem key={project.id} value={project.id}>
        <CircleIcon sx={{fontSize: '12px', color: project.color.background}}/>
        <Typography ml={'10px'} fontSize={'13px'}>
          {project.name}
        </Typography>
      </MenuItem>)
    }
  </Select>
}

const selectStyles = (theme: Theme) => ({
  'background': `${theme.background.visibleBackground} !important`,
  '& .MuiSelect-select': {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    color: theme.text.main,
  },
  '& fieldset': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    color: theme.text.main,
  },
})

const selectItemStyles = (theme: Theme) => ({
  'display': 'flex',
  'padding': '0px 15px',
  'alignItems': 'center',
  'background': theme.background.visibleBackground,
})


export default ProjectSelect
