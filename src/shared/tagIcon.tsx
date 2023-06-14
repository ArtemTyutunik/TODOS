import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const TagIcon = ({background}: {background: string}) => {
  const tagNameStyle = (color: string) => ( {
    fontSize: '15px',
    color: color,
    fontFamily: '-apple-system',
  })
  return <LocalOfferIcon sx={tagNameStyle(background)}/>
};

export default TagIcon;
