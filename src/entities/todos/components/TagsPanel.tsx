import React from 'react';
import {styled} from '@mui/material/styles';
import {ITag} from '@shared/interfaces';

interface Props {
    tags: ITag[]
}
const TagLinks = ({tags}: Props) => {
  return (
    <>
      {
        tags.map((tag) => <TagLink key={tag.name} link={tag.name}/>)
      }
    </>
  );
};

const TagLink = ({link}: {link: string}) => {
  return <CustomTagLink>
    {link}
  </CustomTagLink>
}

const CustomTagLink = styled('span')(({theme}) => ({
  backgroundColor: theme.background.lightGrey,
  fontSize: '16px',
  cursor: 'text',
  padding: '2px 14px',
  color: 'rgb(0, 0, 0)',
  fontWeight: 400,
  lineHeight: '18px',
  borderRadius: '2em',
  marginRight: '10px',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";',
}));

export default TagLinks;
