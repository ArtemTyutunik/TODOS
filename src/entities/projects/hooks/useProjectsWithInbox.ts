import {IProject} from '@shared/interfacesAndTypes';
import {useSelector} from 'react-redux';
import {projectsSelector} from '@entities/projects/model/store';

const useProjectWithInbox = (id: string | undefined): IProject | undefined | string => {
  const projects = useSelector(projectsSelector)

  if (id === localStorage.getItem('inboxID')) {
    return id
  }

  return projects.find((project) => project.id === id)
}

export default useProjectWithInbox
