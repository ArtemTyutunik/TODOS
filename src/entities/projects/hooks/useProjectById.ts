import {IProject} from '@shared/interfacesAndTypes';
import {useSelector} from 'react-redux';
import {projectsSelector} from '@entities/projects/model/store';
import {useEffect, useState} from 'react';
import {getProjectById} from '@shared/api/services/projects';

type ReturnType = [IProject | undefined, boolean, boolean]

const useProjectById = (id: string | undefined): ReturnType => {
  const projects = useSelector(projectsSelector)

  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState<IProject>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const findProject = async () => {
      const project = projects.find((project) => project.id === id)

      if (project) {
        setProject(project)
      } else {
        await fetchProject()
      }
    }

    findProject()
  }, [id])


  const fetchProject = async () => {
    try {
      setLoading(true)
      if (!id) {
        setLoading(false)
        return setProject(undefined)
      }

      const project = await getProjectById(id)
      setProject(project)

      setTimeout(() => {
        setLoading(false)
      }, 200)
    } catch (e) {
      setError(true)
    }
  }

  return [project, loading, error]
}

export default useProjectById
