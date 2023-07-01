import {Box} from '@mui/material';
import {PageTitle} from '@pages/todos/components';
import TagsSection from '@pages/todos/pages/TagsPage/components/tags/TagsSection';
import {useSelector} from 'react-redux';
import {errorDuringFetchSelector} from '@entities/tag/store/tagStore';
import TagsFetchingFailed from '@shared/components/Notification/errors/TagsFetchFailed';


const TagsPage = () => {
  const errorFetching = useSelector(errorDuringFetchSelector)

  return <Box mt={'30px'}>
    {
      errorFetching ? <TagsFetchingFailed/> : (
          <>
            <PageTitle>
            Filters and Tags
            </PageTitle>
            <TagsSection/>
          </>
      )
    }

  </Box>
};

export default TagsPage;
