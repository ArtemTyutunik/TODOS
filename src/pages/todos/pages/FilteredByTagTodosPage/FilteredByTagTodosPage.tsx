import {useNavigate, useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useTagById} from '@entities/tag';
import {useTodosByQuery} from '@pages/todos/hooks';
import {PageTitle, TodoList} from '@pages/todos/components';
import NoTodosWithTag from '@pages/todos/pages/FilteredByTagTodosPage/ui/noTodosWithTag';
import CustomIconButton from '@shared/components/CustomIconButton';
import {TAGS_LINK} from '@shared/constants';

const FilteredByTagTodosPage = () => {
  const {id} = useParams()
  const filteredTodos = useTodosByQuery('tags', id!)
  const tag = useTagById(id)
  const navigate = useNavigate()

  return (
    <>
      {
        filteredTodos.length === 0 ? <NoTodosWithTag/> :
            <TodoList noAddButton todos={filteredTodos}>
              <PageTitle>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <CustomIconButton sx={{mr: '10px'}} onClick={() => navigate('/' + TAGS_LINK)}>
                    <ArrowBackIcon sx={{fontSize: '18px'}}/>
                  </CustomIconButton>
                  {tag?.name}
                </Box>
              </PageTitle>
            </TodoList>
      }
    </>
  );
};

export default FilteredByTagTodosPage;
