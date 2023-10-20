import * as React from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {PageTitle, TodoList} from '@pages/todos/components';
import {useProjectById, useProjectTodos} from '@entities/projects';
import NotFound from '@pages/NotFound';
import getUserId from '@shared/helpers/getUserId';
import {useAppDispatch} from '@app/store';
import {addMemberToProjectThunk} from '@entities/projects/model/thunks';
import AccessRestricted from './AccessResricted';

const ProjectPage = () => {
  const {id: projectId} = useParams()
  const dispatch = useAppDispatch()
  const [project] = useProjectById(projectId!)
  const projectTodos = useProjectTodos(projectId!)
  const [accessRestricted, setAccessRestricted] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const userId = getUserId()
    const isUserMember = project?.members.find((member) => member.id === userId) !== undefined
    if (!isUserMember && project?.shared === 'private') {
      setAccessRestricted(true)
    }

    if (isUserMember || project?.shared === 'public') {
      setAccessRestricted(false)
    }

    if (!isUserMember && project?.shared === 'public' && projectId && project) {
      dispatch(addMemberToProjectThunk({projectId, userId, project}))
    }
  }, [project, projectId])

  if (!project) return <NotFound/>

  if (accessRestricted || accessRestricted === null) return <AccessRestricted/>


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
