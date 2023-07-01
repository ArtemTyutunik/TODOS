import React from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {PageTitle, TodoList} from '@pages/todos/components';
import useProjectById from '@pages/project/hooks/useProjectById';
import {useProjectTodos} from '@entities/projects';

const ProjectPage = () => {
  const {id: projectId} = useParams()
  const project = useProjectById(projectId!)
  const projectTodos = useProjectTodos(projectId!)

  if (!project) return null
  //todo move page title to shared

  return ( project ? (
          <Box>
            <PageTitle>
              {project.name}
            </PageTitle>
            <Box>
              <TodoList todos={projectTodos} initialProject={project.id}/>
            </Box>
          </Box>
        ): null
  )
};

export default ProjectPage;
