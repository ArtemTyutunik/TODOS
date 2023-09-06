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

const CustomTagLink = styled(Typography)(({theme}) => ({
  width: 'fit-content',
  marginTop: '8px',
  fontSize: '13px',
  cursor: 'text',
  padding: '1px 16px',
  fontWeight: 400,
  lineHeight: '18px',
  borderRadius: '2em',
  marginRight: '10px',
  fontFamily: theme.typography.fontFamily,
}));

export default TagLinks;
