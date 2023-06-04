import {ITag} from '@shared/interfaces';

export const configureNewTag = (name: string): ITag => ( {
  name: name,
  settings: {
    name: 'Charcoal',
    background: 'rgb(129 129 130)',
    textColor: '#ffffff',
  },
})
