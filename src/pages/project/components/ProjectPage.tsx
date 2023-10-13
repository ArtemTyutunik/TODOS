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
import useProjectWebSocketConnection, {UpdateFunctionMessage} from '@pages/project/hooks/useProjectWebSocketConnection';

export const ProjectContext = React.createContext<null |
    {connectProjectToWebSocket:(message: UpdateFunctionMessage) => void}>(null)

const ProjectPage = () => {
  const {id: projectId} = useParams()
  const dispatch = useAppDispatch()
  const [project] = useProjectById(projectId!)
  const projectTodos = useProjectTodos(projectId!)
  const [accessRestricted, setAccessRestricted] = React.useState<boolean | null>(null)
  const connectProjectToWebSocket = useProjectWebSocketConnection(projectId as string)

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
      <ProjectContext.Provider value={{connectProjectToWebSocket}}>
        <Box>
          <TodoList todos={projectTodos} initialProject={project.id} projectTodoList>
            <PageTitle>
              {project.name}
            </PageTitle>
          </TodoList>
        </Box>
      </ProjectContext.Provider>
        ): null
  )
};

export default ProjectPage;
