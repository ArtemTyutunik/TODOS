import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {PageTitle, TodoList} from '@pages/todos/components';
import {useProjectById, useProjectTodos} from '@entities/projects';
import NotFound from '@pages/NotFound';
import getUserId from '@shared/helpers/getUserId';

const ProjectPage = () => {
  const {id: projectId} = useParams()
  const [project] = useProjectById(projectId!)
  const projectTodos = useProjectTodos(projectId!)
  const [accessRestricted, setAccessRestricted] = useState<boolean | null>(null)

  useEffect(() => {
    const userId = getUserId()
    const isUserMember = project?.members.find((member) => member.id === userId) !== undefined

    console.log(isUserMember)
    if (!isUserMember && project?.shared === 'private') {
      setAccessRestricted(true)
    }

    if (isUserMember || project?.shared === 'public') {
      setAccessRestricted(false)
    }
  }, [project])

  if (!project) return <NotFound/>
  console.log(project)

  if (accessRestricted || accessRestricted === null) return <> Restricted</>


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
