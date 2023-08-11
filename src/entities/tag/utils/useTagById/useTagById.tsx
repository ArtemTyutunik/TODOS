import {useSelector} from 'react-redux';
import {userTagsSelector} from '@entities/tag/store/tagStore';
import {ITag} from '@shared/interfacesAndTypes';


function useTagById<T extends ITag | ITag[]>(id: string | string[] | undefined): T {
  const userTags = useSelector(userTagsSelector)

  if (Array.isArray(id)) {
    const tags: ITag[] = id.map((tagId) => userTags.find((tag) => tag.id === tagId)!);
    return tags as T
  }
  const index = userTags.findIndex((tag) => tag.id === id);
  return userTags[index] as T
}

export default useTagById;
