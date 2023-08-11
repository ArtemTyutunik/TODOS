import {useTagById} from '@entities/tag';
import {useSelector} from 'react-redux';
import {ITag} from '@shared/interfacesAndTypes';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockTags: ITag[] = [{
  id: '1',
  name: 'tag',
  settings: {
    textColor: '#000',
    name: 'test',
    background: '#fff',
  },
},
{
  id: '2',
  name: 'tag 2',
  settings: {
    textColor: '#000',
    name: 'test',
    background: '#fff',
  },
},
{
  id: '3',
  name: 'tag 3',
  settings: {
    textColor: '#000',
    name: 'test',
    background: '#fff',
  },
},
];

describe('correct functionality of useTagById', () => {
  it('should return correct undefined when no tag', () => {
    (useSelector as jest.Mock).mockReturnValue([]); // Mock return value
    expect(useTagById('1')).toBe(undefined);
  });

  it('should return correct tag from array', () => {
    (useSelector as jest.Mock).mockReturnValue(mockTags);
    expect(useTagById('1')).toEqual(mockTags[0]);
  });

  it('should return correct array of tags', () => {
    (useSelector as jest.Mock).mockReturnValue(mockTags);
    expect(useTagById(['1', '3'])).toEqual([mockTags[0], mockTags[2]]);
  });

  it('should return correct undefined when no id', () => {
    (useSelector as jest.Mock).mockReturnValue(mockTags);
    expect(useTagById(undefined)).toBe(undefined);
  })
})


