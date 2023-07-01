import {IProject} from '@shared/interfacesAndTypes';
import {useSelector} from 'react-redux';
import {projectsSelector} from '@entities/projects/model/store';


const useProjectById = (id: IProject['id']): IProject | undefined => {
  const projects = useSelector(projectsSelector);

  return projects.find((project) => project.id === id)
}

export default useProjectById;
