import {Box} from '@mui/material';
import {PageTitle} from '@pages/todos/components';
import TagsSection from '@pages/todos/pages/FiltersAndTagsPage/components/tags/TagsSection';


const FilterAndTagsPage = () => {
  //const imgUrl = 'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/2501ba1c4829d47f4193a8f75efc2350.jpg'
  return <Box mt={'30px'}>
    <PageTitle>
      Filters and Tags
    </PageTitle>

    <TagsSection/>
  </Box>
};

export default FilterAndTagsPage;
