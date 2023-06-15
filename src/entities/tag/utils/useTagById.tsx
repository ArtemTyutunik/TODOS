import {ITag} from '@shared/interfacesAndTypes';
import {useSelector} from 'react-redux';
import {userTagsSelector} from '@entities/tag/store/tagStore';


const useTagById = (id: string | undefined): ITag=> {
  const userTags = useSelector(userTagsSelector)
  const index = userTags.findIndex((tag) => tag.id === id);
  return userTags[index]
}

export default useTagById;
