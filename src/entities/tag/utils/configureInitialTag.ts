import {ITag} from '@shared/interfacesAndTypes';

export const configureNewTag = (name: string): ITag => ( {
  id: Date.now() + '',
  name: name,
  settings: {
    name: 'Charcoal',
    background: 'rgb(129 129 130)',
    textColor: '#ffffff',
  },
})
