import {useState} from 'react';
import {useSelector} from 'react-redux';
import {projectsSelector} from '@entities/projects/model/store';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import ProjectView from '@entities/projects/components/projectView';

interface ProjectSelectProps {
    initialProjectId?: string,
    onChange: (id: string) => void
}

const ProjectSelect = ({initialProjectId, onChange}: ProjectSelectProps) => {
  const inboxID = localStorage.getItem('inboxID')!
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
    <MenuItem value={inboxID}>
      <ProjectView id={inboxID}/>
    </MenuItem>
    {
      projects.map((project) => <MenuItem key={project.id} value={project.id}>
        <ProjectView color={project.color.background} name={project.name} id={project.id}/>
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


export default ProjectSelect
