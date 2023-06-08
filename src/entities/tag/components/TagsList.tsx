import React from 'react';
import {Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {ITag, tagIdType} from '@shared/interfacesAndTypes';

interface Props {
    tags: ITag[],
    todoCurrentTags: tagIdType[],
    onSelect: (newTag: string) => void
}
const TagsList = ({tags, todoCurrentTags, onSelect}: Props) => {
  return (
    <List>
      {
        tags.length > 0 ?
           tags.map((tag) => <TagsItem tag={tag}
             key={tag.name}
             onSelect={() => onSelect(tag.id)}
             checked={!!todoCurrentTags.find((item) => item === tag.id)}
           />) :
           null
      }
    </List>
  );
};

interface TagsItemProps {
    tag: ITag,
    checked: boolean,
    onSelect: () => void
}

function TagsItem({tag, checked, onSelect}: TagsItemProps) {
  return <ListItem sx={{padding: '0'}}>
    <ListItemButton
      onClick={onSelect}
      role={undefined}
      dense
      sx={{padding: '0 8px'}}
    >
      <IconButton>
        <TurnedInIcon sx={{fontSize: '16px', color: tag.settings?.background}}/>
      </IconButton>
      <ListItemText primary={`${tag.name}`}
        sx={(theme) => ({
          marginRight: '14px',
          color: theme.text.title})}/>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          size={'small'}
        />
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
}

export default TagsList;
