import {ITag} from '@shared/interfaces';

export const configureNewTag = (name: string): ITag => ( {
  name: name,
  settings: {
    colorBG: '#d37171',
    colorText: '#fff',
  },
})
