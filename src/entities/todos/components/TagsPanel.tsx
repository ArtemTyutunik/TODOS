import React from 'react';
import {styled} from '@mui/material/styles';
import {ITag} from '@shared/interfaces';
import {Typography} from '@mui/material';

interface Props {
    tags: ITag[]
}
const TagLinks = ({tags}: Props) => {
  return (
    <>
      {
        tags.map((tag) => <TagLink key={tag.name} tag={tag}/>)
      }
    </>
  );
};

const TagLink = ({tag}: {tag: ITag}) => {
  return <CustomTagLink sx={{backgroundColor: tag.settings?.colorBG, color: tag.settings?.colorText}}>
    {tag.name}
  </CustomTagLink>
}

const CustomTagLink = styled(Typography)(() => ({
  fontSize: '16px',
  cursor: 'text',
  padding: '2px 14px',
  fontWeight: 400,
  lineHeight: '18px',
  borderRadius: '2em',
  marginRight: '10px',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";',
}));

export default TagLinks;
