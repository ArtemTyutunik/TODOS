import React from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {PageTitle, TodoList} from '@pages/todos/components';
import useProjectById from '@pages/project/hooks/useProjectById';
import {useProjectTodos} from '@entities/projects';
import NotFound from '@pages/NotFound';

const ProjectPage = () => {
  const {id: projectId} = useParams()
  const project = useProjectById(projectId!)
  const projectTodos = useProjectTodos(projectId!)

  if (!project) return <NotFound/>

  return ( project ? (
          <Box>
            <TodoList todos={projectTodos} initialProject={project.id}>
              <PageTitle>
                {project.name}
              </PageTitle>
            </TodoList>
          </Box>
        ): null
  )
};

export default ProjectPage;
