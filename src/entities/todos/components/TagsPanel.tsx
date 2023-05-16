import React from 'react';
import {Link} from 'react-router-dom';
import {styled} from '@mui/material/styles';

interface Props {
    tags: string[]
}
const TagLinks = ({tags}: Props) => {
  return (
    <>
      {
        tags.map((tag) => <TagLink key={tag} link={tag}/>)
      }
    </>
  );
};

const TagLink = ({link}: {link: string}) => {
  return <CustomTagLink to={link}>
    {link}
  </CustomTagLink>
}

const CustomTagLink = styled(Link)(({theme}) => ({
  backgroundColor: theme.background.lightGrey,
  fontSize: '16px',
  padding: '2px 14px',
  color: 'rgb(0, 0, 0)',
  fontWeight: 400,
  lineHeight: '18px',
  borderRadius: '2em',
  marginRight: '10px',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";',
}));

export default TagLinks;
