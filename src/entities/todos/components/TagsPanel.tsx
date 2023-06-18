import React from 'react';
import {styled} from '@mui/material/styles';
import {ITag} from '@shared/interfacesAndTypes';
import {Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

interface Props {
    tags: ITag[] | undefined;
}
const TagLinks = ({tags}: Props) => {
  return (
    <Box display={'flex'} flexWrap={'wrap'}>
      {
        tags?.map((tag) => tag && <TagLink key={tag.name} tag={tag}/>)
      }
    </Box>
  );
};

const TagLink = ({tag}: {tag: ITag}) => {
  return <CustomTagLink sx={{backgroundColor: tag.settings?.background, color: tag.settings?.textColor}}>
    <Link to={`/tags/${tag.id}`}>
      {tag.name}
    </Link>
  </CustomTagLink>
}

const CustomTagLink = styled(Typography)(() => ({
  width: 'fit-content',
  marginTop: '8px',
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
