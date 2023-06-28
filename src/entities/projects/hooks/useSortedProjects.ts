import {IProject} from '@shared/interfacesAndTypes';

const useSortedProjects = (projects: IProject[]):
    [pinned: IProject[], unpinned: IProject[]] => {
  const pinnedProjects: IProject[] = [];
  const unPinnedProjects: IProject[] = [];

  projects.forEach((element) => {
    if (element.isPinned) {
      pinnedProjects.push(element);
    } else {
      unPinnedProjects.push(element);
    }
  });

  return [pinnedProjects, unPinnedProjects]
}

export default useSortedProjects;
