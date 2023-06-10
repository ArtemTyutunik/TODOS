import {Box} from '@mui/material';
import {PageTitle} from '@pages/todos/components';
import TagsSection from '@pages/todos/pages/FiltersAndTagsPage/components/tags/TagsSection';


const FilterAndTagsPage = () => {
  return <Box mt={'30px'}>
    <PageTitle>
      Filters and Tags
    </PageTitle>

    <TagsSection/>
  </Box>
};

export default FilterAndTagsPage;
